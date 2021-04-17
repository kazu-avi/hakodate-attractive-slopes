<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    /**
     * リレーションの設定
     */
    public function users() {
        return $this->belongsToMany(User::class);
    }
}
