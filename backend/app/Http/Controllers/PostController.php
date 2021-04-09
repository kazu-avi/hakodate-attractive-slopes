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
        $path = Storage::disk('s3')->put('image', $image, 'public');

        // データセット
        $post->file_path = Storage::disk('s3')->url($path);
        $post->text = $input['text'];
        $post->user_id = $input['user_id'];

        DB::beginTransaction();

        try {
            $post->save();
        } catch (Throwable $e) {
            return response()->json([$e]);
            Storage::disk('s3')->delete($path);
        }

    }
}
