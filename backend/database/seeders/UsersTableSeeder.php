<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'ゲストユーザー',
                'img' => "https://hakodate-slopes.s3.ap-northeast-1.amazonaws.com/users/FRoCAKZLdSDDnt9O5UZKmXJAAbETn4kWjnYyLceK.jpg",
                'email' => 'test@test.com',
                'password' => '$2y$10$NPxsapF45WbY6GScA488m.jRynpySR8Wc7eo9bdCY/O3EC9e/eVLy'
            ]
        ]);
    }
}
