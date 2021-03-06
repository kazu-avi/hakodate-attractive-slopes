<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'file_path',
        'text'
    ];

    protected $appends = [
        'likes_count',
        'liked_by_user'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return  $date->format('Y-m-d H:i');
    }

    // レスポンスの際に不必要なカラムを除く
    protected $hidden = [
        'created_at',
        'deleted_at'
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

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function likes() {
        return $this->belongsToMany(User::class, 'likes');
    }

    /**
     * アクセサ
     */

     // 「行きたい」数の集計
     public function getLikesCountAttribute() {
        return $this->likes->count();
     }

     // アクセスしたユーザーが「行きたい」済かどうか確認
     public function getLikedByUserAttribute() {
        return $this->likes->contains(Auth::user());
     }
}
