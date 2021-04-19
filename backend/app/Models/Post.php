<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'file_path',
        'text'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return  $date->format('Y-m-d H:i');
    }

    // レスポンスの際に不必要なカラムを除く
    protected $hidden = [
        'created_at'
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
}
