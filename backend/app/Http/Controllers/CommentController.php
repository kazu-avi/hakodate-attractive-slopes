<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentPostRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Comment;

class CommentController extends Controller
{
    // コメントの投稿
    public function postComment(CommentPostRequest $request, $id) {
        $inputs = $request->all();
        try {
            Comment::create([
                "user_id" => Auth::user()->id,
                "post_id" => $id,
                "comment" => $inputs["comment"],
            ]);
            return response()->json(["message" => "コメントを投稿しました"], 201);
        } catch (\Exception $e) {
            return response()->json([$e->getMessage()], $e->getCode());
        }
    }
}
