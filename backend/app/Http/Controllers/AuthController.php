<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginPostRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Throwable;
use Tymon\JWTAuth\JWTGuard;


class AuthController extends Controller
{
    // email, passwordで認証してトークンを発行する
    public function login(LoginPostRequest $request) {
        $credentials = $request->only(['email', 'password']);

        try {
            //認証エラーの場合401エラーを返す
            if (! $token = Auth::attempt($credentials) ) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            //認証OKの場合はトークンを発行
            return $this->respondWithToken($token);
        } catch (Throwable $e) {
            return response()->json(["message" => $e], $e->getHttpStatusCode());
        }
    }

    // 自身の情報を返す
    public function me() {
        return response()->json(Auth::user());
    }

    //トークンを発行する
    protected function respondWithToken($token) {
        return response()->json([
            'uid' => Auth::user()->id,
            'username' => Auth::user()->name,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 3600
        ]);
    }

    // トークンを再発行する
    public function refresh() {
        return $this->respondWithToken(Auth::refresh());
    }

    public function logout() {
        Auth::logout();

        return response()->json(['message' => 'ログアウト成功']);
    }
}
