<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PhotoPostRequest;
use Illuminate\Support\Facades\Storage;
use Throwable;

class PostController extends Controller
{
    // 新規投稿を保存
    public function post(PhotoPostRequest $request) {

        $post = new Post();
        $input = $request->all();

        $image = $input['file'];

        // S3に画像を保存し、パスを代入
        $path = Storage::disk('s3')->put('images', $image, 'public');

        // データセット
        $post->file_path = Storage::disk('s3')->url($path);
        $post->text = $input['text'];
        $post->user_id = $input['user_id'];
        $post->category_id = $input['category_id'];

        DB::beginTransaction();

        try {
            $post->save();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            // エラーがあった場合、DBと一致しないことを防ぐため、ストレージから画像を削除
            Storage::disk('s3')->delete($path);
            return response()->json([$e],401);
        }
        return response($post, 201);
    }

    // 投稿一覧を取得
    public function getAllPosts() {
        $data = array();
        $posts = Post::with('user', 'category')->orderBy('updated_at','desc')->get();

        // 必要部分のみ抜き出してresponse
        foreach ($posts as $post) {
            $json = [
                'id' => $post->id,
                'user_name' => $post->user->name,
                'file_path' => $post->file_path,
                'category' => $post->category->name,
                'updated_at' => $post->updated_at->format('Y-m-d H:i'),
                'text' => $post->text
            ];
            array_push($data, $json);
        };

        return response()->json($data);
    }
}
