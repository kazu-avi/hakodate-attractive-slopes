<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    // 行きたい付加
    public function like($id) {
        $post = Post::with('likes')->where('id', $id)->first();

        if(!$post) {
            return response()->json(["message" => "該当する投稿IDがありません"], 404);
        }

        // 2度目のリクエストの際に、行きたいが重複しないように、一度削除してから作成
        $post->likes()->detach(Auth::user()->id);
        $post->likes()->attach(Auth::user()->id);

        $result = Post::with('likes')->where('id', $id)->first();

        // $result = Post::with('likes')->where('id', $id)->first();
        $return = [
            "likes_count" => $result->likes_count,
            "liked_by_user" => $result->liked_by_user
        ];

        return response()->json([$return],201);
    }

    // 行きたい削除
    public function unlike($id) {
        $post = Post::with('likes')->where('id', $id)->first();

        if(!$post) {
            return response()->json(["message" => "該当する投稿IDがありません"], 404);
        }

        $post->likes()->detach(Auth::user()->id);

        $result = Post::with('likes')->where('id', $id)->first();

        return response()->json([$result],201);
    }
}
