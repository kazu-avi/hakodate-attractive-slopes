<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PhotoPostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\Storage;
use Throwable;

class PostController extends Controller
{
    // 新規投稿を保存
    public function post(PhotoPostRequest $request) {

        $post = new Post();
        $input = $request->all();

        // タグ登録の処理
        $inputTags = $request['tags'];


        $tags = [];
        $tags_id = [];

        if ($inputTags) {
            DB::beginTransaction();
            try {
                foreach ($inputTags as $tag) {
                    $record = Tag::firstOrCreate([
                        'name' => $tag,
                    ]);
                    array_push($tags, $record);
                }
                DB::commit();
                foreach ($tags as $tag) {
                    array_push($tags_id, $tag->id);
                }
            } catch(\Exception $e) {
                DB::rollBack();
                return response()->json([$e],401);
            }
        }

        // 画像をs3に保存
        $image = $input['file'];
        $path = Storage::disk('s3')->put('images', $image, 'public');

        // データセット
        $post->file_path = Storage::disk('s3')->url($path);
        $post->text = $input['text'];
        $post->user_id = $input['user_id'];
        $post->category_id = $input['category_id'];

        DB::beginTransaction();

        try {
            $post->save();
            $post->tags()->attach($tags_id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            // エラーがあった場合、DBと一致しないことを防ぐため、ストレージから画像を削除
            Storage::disk('s3')->delete($path);
            return response()->json([$e],401);
        }
        return response($post, 201);
    }

    // 投稿を編集する
    public function edit(UpdatePostRequest $request, $id) {

        $post = Post::find($id);
        $input = $request->all();

        // タグ登録の処理
        $inputTags = $request['tags'];

        $tags = [];
        $tags_id = [];

        if ($inputTags) {
            DB::beginTransaction();
            try {
                foreach ($inputTags as $tag) {
                    $record = Tag::firstOrCreate([
                        'name' => $tag,
                    ]);
                    array_push($tags, $record);
                }
                DB::commit();
                foreach ($tags as $tag) {
                    array_push($tags_id, $tag->id);
                }
            } catch(\Exception $e) {
                DB::rollBack();
                return response()->json([$e],401);
            }
        }

        // 画像をs3に保存
        if (isset($input['file'])) {
            $image = $input['file'];
            $path = Storage::disk('s3')->put('images', $image, 'public');
        }

        // データセット
        if (isset($input['file'])) {
            $post->file_path = Storage::disk('s3')->url($path);
        }
        $post->text = $input['text'];
        $post->user_id = $input['user_id'];
        $post->category_id = $input['category_id'];

        DB::beginTransaction();

        try {
            $post->save();
            $post->tags()->detach();
            $post->tags()->attach($tags_id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            // エラーがあった場合、DBと一致しないことを防ぐため、ストレージから画像を削除
            if (isset($input['file'])) {
                Storage::disk('s3')->delete($path);
            }
            return response()->json([$e],401);
        }
        return response($post, 201);
    }

    // 投稿削除
    public function delete($id) {
        try {
            $post = Post::find($id);
            $post->delete();
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], $e->getCode());
        }
        return response()->json(["message" => "投稿削除成功"]);
    }

    // 投稿一覧を取得
    public function getAllPosts() {
        $posts = Post::with('user', 'category', 'tags', 'likes')
            ->orderBy('updated_at','desc')
            ->paginate(9);

        return response()->json($posts);
    }

    // 投稿一覧をランダムで取得
    public function getRandomPosts() {
        $posts = Post::with('user', 'category', 'tags', 'likes')
            ->inRandomOrder()
            ->paginate(9);

        return response()->json($posts);
    }

    // 個別投稿を取得
    public function getPost($id) {
        try {
            $post = Post::with('user', 'category', 'tags', 'comments.user', 'likes')->find($id);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], $e->getCode());
        }
        return response()->json($post);
    }

    // カテゴリ別投稿一覧の取得
    public function getPostsWithCategory($id) {
        $posts = Post::with('user', 'category', 'tags', 'likes')
            ->where('category_id', $id)
            ->orderBy('updated_at','desc')
            ->paginate(9);

        return response()->json($posts);
    }

    // タグ別投稿一覧の取得
    public function getPostsWithTag($id) {
        $posts = Post::with('user', 'category', 'tags', 'likes')
            ->whereHas('tags', function(Builder $query) use($id) {
                $query->where('tag_id', $id);
            })
            ->orderBy('updated_at','desc')
            ->paginate(9);

        return response()->json($posts);
    }

    // ユーザー別投稿一覧取得
    public function getMyPosts($id) {
        try {
            $posts = Post::with('user', 'category', 'tags', 'likes')
            ->where('user_id', $id)
            ->orderBy('updated_at', 'desc')
            ->paginate(6);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], $e->getCode());
        }
        return response()->json($posts, 200);
    }

    // ユーザー別「行きたい」した投稿一覧取得
    public function getMyLikes($id) {
        try {
            $posts = Post::with('user', 'category', 'tags', 'likes')
            ->whereHas('likes', function(Builder $query) use($id) {
                $query->where('user_id', $id);
            })
            ->orderBy('updated_at','desc')
            ->paginate(6);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], $e->getCode());
        }
        return response()->json($posts, 200);
    }
}
