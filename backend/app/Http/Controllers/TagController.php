<?php

namespace App\Http\Controllers;

use App\Models\Tag;

class TagController extends Controller
{
    // タグ一覧を取得
    public function getAllTags () {
        $tagsList = Tag::get(['id', 'name']);
        return response()->json($tagsList);
    }
}
