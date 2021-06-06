<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Schema;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PhotoPostTest extends TestCase
{
    /**
     * DBエラーの場合、ストレージからファイルが正常に削除されるか
     *
     * @return void
     */
    // public function test_failure_DB()
    // {
    //     // DBからテーブルを削除しエラーを起こす
    //     Schema::drop('posts');

    //     // ダミーファイルの作成
    //     $file = UploadedFile::fake()->image('test.jpg');

    //     $data = [
    //         'file' => $file,
    //         'text' => 'testtest',
    //         'user_id' => 1
    //     ];

    //     $response = $this->withHeaders([
    //         'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6MzAwODBcL2FwaVwvdjFcL3JlZnJlc2giLCJpYXQiOjE2MTc5ODY4MzIsImV4cCI6MTYxODEyMDUwOSwibmJmIjoxNjE4MTE2OTA5LCJqdGkiOiJrN2p5NXJobXYycmxzV0lNIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.QYbOIJZwNZyJ-ZHPPLzkSjt9dS7jXpE5qZ0Yp2g1xCY'
    //     ])->json('POST', route('post'), $data);

    //     $response->assertStatus(401);
    //     // ストレージ内にファイルがないことの確認
    //     $this->assertEquals(0, count(Storage::files('images')));

    // }

    /**
     * ストレージ保存エラーの場合、DBに挿入しない
     *
     * @return void
     */
    public function test_failure_storage()
    {
        // ストレージをモックする
        Storage::shouldReceive()
            ->once()
            ->andReturnNull();

        //ダミーファイル作成
        $file = UploadedFile::fake()->image('test.jpg');

        $data = [
            'file' => $file,
            'text' => 'testtest',
            'user_id' => 1
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6MzAwODBcL2FwaVwvdjFcL3JlZnJlc2giLCJpYXQiOjE2MTc5ODY4MzIsImV4cCI6MTYxODExNjEwMCwibmJmIjoxNjE4MTEyNTAwLCJqdGkiOiJROUdndndrclNlNHpTT0hTIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.tKIGjvuJ9qN37ogwZ7M2Wun7CWSvI2rpCfEpgHrd7kc'
        ])->json('POST', route('post'), $data);

        $response->assertStatus(401);

        $this->assertEmpty(Post::all());
    }
}
