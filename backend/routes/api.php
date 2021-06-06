<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TagController;
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

// カテゴリー一覧の取得
Route::get('/v1/categories', [CategoryController::class, 'getAllCategories'])->name('getAllCategories');

// タグ一覧の取得
Route::get('/v1/tags', [TagController::class, 'getAllTags'])->name('getAllTags');

//　投稿一覧の取得
Route::get('/v1/posts', [PostController::class, 'getAllPosts'])->name('getAllPosts');

// 投稿一覧をランダムで取得
Route::get('/v1/posts/r', [PostController::class, 'getRandomPosts'])->name('getRandomPosts');


// 個別投稿の取得
Route::get('/v1/posts/{id}', [PostController::class, 'getPost'])->name('getPost');

//　カテゴリー別投稿一覧の取得
Route::get('/v1/categories/{id}', [PostController::class, 'getPostsWithCategory'])->name('getPostsWithCategory');

// タグ別投稿一覧の取得
Route::get('/v1/tags/{id}', [PostController::class, 'getPostsWithTag'])->name('getPostsWithTag');


Route::middleware(['auth:api'])->group(function () {
    // 認証ユーザーを返却する
    Route::post('/v1/me', [AuthController::class, 'me'])->name('me');
    // ログアウト
    Route::post('/v1/logout', [AuthController::class, 'logout'])->name('logout');
    // 投稿する
    Route::post('/v1/posts/', [PostController::class, 'post'])->name('post');
    // コメントを投稿する
    Route::post('/v1/posts/{id}/comments', [CommentController::class, 'postComment'])->name('postComment');
    // ユーザー情報を編集する
    Route::put('/v1/users/{id}', [UserController::class, 'update'])->name('userUpdate');
    // ユーザーを削除する
    Route::delete('/v1/users/{id}', [UserController::class, 'delete'])->name('userDelete');
    // 投稿を編集する
    Route::put('/v1/posts/{id}', [PostController::class, 'edit'])->name('postEdit');
    // 投稿を削除する
    Route::delete('v1/posts/{id}', [PostController::class, 'delete'])->name('postDelete');
    // 自分が「行きたい」した投稿一覧
    Route::get('/v1/posts/{id}/likes', [PostController::class, 'getMyLikes'])->name('getMyLikes');
    // 行きたい追加
    Route::put('/v1/posts/{id}/likes', [LikeController::class, 'like'])->name('putLike');
    // 行きたい削除
    Route::delete('/v1/posts/{id}/likes', [LikeController::class, 'unlike'])->name('deleteLike');
    // 自分の投稿一覧
    Route::get('/v1/posts/users/{id}', [PostController::class, 'getMyPosts'])->name('getMyPosts');

});
