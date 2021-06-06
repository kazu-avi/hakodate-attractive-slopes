<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterPostRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Barryvdh\Debugbar\Facade as Debugbar;
use League\Flysystem\Exception;
use Throwable;

class UserController extends Controller
{
    // 新規ユーザー登録
    public function register(RegisterPostRequest $request) {
        $user = new User();
        //データを受け取る
        $inputs = $request->all();
        DebugBar::info($inputs);

        // 画像をs3に保存
        if(isset($inputs['img'])) {
            $image = $inputs['img'];
            $path = Storage::disk('s3')->put('users', $image, 'public');
        }

        // データセット
        if(isset($inputs['img'])) {
            $user->img = Storage::disk('s3')->url($path);
        }
        $user->name = $inputs['name'];
        $user->email = $inputs['email'];
        $user->password = Hash::make($inputs['password']);

        DB::beginTransaction();

        try {
            $user->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            // エラーがあった場合、DBと一致しないことを防ぐため、ストレージから画像を削除
            if($path) {
                Storage::disk('s3')->delete($path);
            }
            return response()->json([$e->getMessage()],401);
        }
        return response()->json($user, 201);
    }

    // ユーザー情報の更新

    public function update(UpdateUserRequest $request, $id) {
        //データを受け取る
        $inputs = $request->all();

        // ゲストユーザー変更不可
        if($id == 1) {
            return response()->json('ゲストユーザーのため変更できません', 401);
        }

        // 画像をs3に保存
        if(isset($inputs['img'])) {
            $image = $inputs['img'];
            $path = Storage::disk('s3')->put('users', $image, 'public');
        }

        // データセット
        $user = User::find($id);
        $user->name = $inputs['name'];
        if(isset($inputs['img'])) {
            $user->img = Storage::disk('s3')->url($path);
        }

        DB::beginTransaction();

        try {
            $user->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            // エラーがあった場合、DBと一致しないことを防ぐため、ストレージから画像を削除
            Storage::disk('s3')->delete($path);
            return response()->json([$e->getMessage()],401);
        }
        return response()->json($user, 201);
    }

    // ユーザー削除
    public function delete($id) {
        // ゲストユーザー削除不可
        if($id == 1) {
            return response()->json('ゲストユーザーのため削除できません', 401);
        }

        try {
            $user = User::find($id);
            $user->delete();
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], $e->getCode());
        }
        return response()->json(["message" => "ユーザー削除成功"]);
    }

    // 登録ずみの全てのユーザーを取得する
    public function getUsers () {
        $usersList = User::all();
        return response()->json($usersList);
    }


    //特定のユーザーを取得する
    public function getTheUser($id) {
        $user = User::find($id);
        return response()->json($user);
    }
}
