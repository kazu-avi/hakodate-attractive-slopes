<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['guest:api'])->group(function () {
    // ログイン（トークン返却）
    Route::post('/v1/login', [AuthController::class, 'login'])->name('login');
    // 登録ユーザー全件取得
    Route::get('/v1/users', [UserController::class, 'getUsers'])->name('getUsers');
    // 個別ユーザー取得
    Route::get('/v1/users/{id}', [UserController::class, 'getTheUser'])->name('getTheUser');
    // 新規ユーザー登録
    Route::post('/v1/users', [UserController::class, 'register'])->name('register');
});

// トークンの再発行
Route::post('/v1/refresh', [AuthController::class, 'refresh'])->name('refresh');

//　カテゴリーの取得
Route::get('/v1/categories', [CategoryController::class, 'getAllCategories'])->name('getAllCategories');

Route::middleware(['auth:api'])->group(function () {
    // 認証ユーザーを返却する
    Route::post('/v1/me', [AuthController::class, 'me'])->name('me');
    // ログアウト
    Route::post('/v1/logout', [AuthController::class, 'logout'])->name('logout');
    // 投稿する
    Route::post('/v1/posts', [PostController::class, 'post'])->name('post');
});
