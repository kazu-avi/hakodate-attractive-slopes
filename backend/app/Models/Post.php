<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SebastianBergmann\Environment\Console;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_path',
        'text'
    ];

    /**
     * リレーションの設定
     *
     */

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }
}
