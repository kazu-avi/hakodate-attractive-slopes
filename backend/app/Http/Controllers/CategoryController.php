<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // カテゴリー一覧を取得
    public function getAllCategories () {
        $categoriesList = Category::get(['id', 'name']);
        return response()->json($categoriesList);
    }
}
