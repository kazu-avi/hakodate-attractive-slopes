<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class CommentApiTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_comment_post()
    {
        $data = [
            "comment" => "テストコメント"
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6MzAwODBcL2FwaVwvdjFcL3JlZnJlc2giLCJpYXQiOjE2MTkwNTgxNTMsImV4cCI6MTYxOTA5MjI3NiwibmJmIjoxNjE5MDg4Njc2LCJqdGkiOiI0cVV2OTU1REwyYWhYT3htIiwic3ViIjozLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.jJ1X4kuxcvjLnu0Ms4mO4o7A7PKne4skskzQ4-xyqPg'
        ])->json('POST', 'api/v1/posts/1/comments', $data);



        $comments = Comment::first();
        $this->assertEquals($data["comment"], $comments->comment);
        $this->assertEquals(Auth::user()->id, $comments->user_id);
        $this->assertEquals("1", $comments->post_id);


        $response->assertStatus(201);

    }
}
