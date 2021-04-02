<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;

class RegisterApiTest extends TestCase
{
    /**
     * ユーザーが正常に登録されるか
     *
     * @return void
     */
    public function test_making_a_user()
    {
        $data = [
            "name" => "sample",
            "email" => "sample@sample.com",
            "password" => "samplesample",
        ];

        $response = $this->json('POST', route('register'), $data);

        $user = User::first();
        $this->assertEquals($data["name"], $user->name);

        $response
            ->assertStatus(200)
            ->assertJson((["message" => "ユーザー登録成功"]));
    }
}
