<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterPostRequest;
use Illuminate\Support\Facades\Hash;
use League\Flysystem\Exception;
use Throwable;

class UserController extends Controller
{
    // 新規ユーザー登録
    public function register(RegisterPostRequest $request) {
        //データを受け取る
        $inputs = $request->all();

        //データがあれば登録する
        if ($inputs) {
            User::create([
                "name" => $inputs['name'],
                "email" => $inputs['email'],
                "password" => Hash::make($inputs['password'])
            ]);
            //成功したらレスポンスを返す
            return response()->json(["message" => "ユーザー登録成功"]);
        }

    }

    // ユーザー削除
    public function delete($id) {
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
