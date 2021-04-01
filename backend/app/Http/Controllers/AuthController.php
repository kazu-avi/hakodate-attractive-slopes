<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    // email, passwordで認証してトークンを発行する
    public function login() {
        $credentials = request(['email', 'password']);

        //認証エラーの場合401エラーを返す
        if (!$token = Auth::attempt([$credentials])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        //認証OKの場合はトークンを発行
        return $this->respondWithToken($token);
    }

    // 自身の情報を返す
    public function me() {
        return response()->json(Auth::user());
    }

    //トークンを発行する
    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 3600
        ]);
    }
}
