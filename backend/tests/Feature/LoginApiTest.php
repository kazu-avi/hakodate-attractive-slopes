<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class LoginApiTest extends TestCase
{
    /**
     * emailとpasswordを受け取って認証し、
     * 認証に成功したら、トークンを発行する
     *
     * @return void
     */
    public function test_making_a_login_api_request()
    {
        $response = $this->json('POST', route('login'), [
            'email' => 'sample@sample.com',
            'password' => 'samplesample'
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonCount(3);
    }
}
