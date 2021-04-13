<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('categories')->insert([
            [
                'name' => '魚見坂',
            ],
            [
                'name' => '船見坂',
            ],
            [
                'name' => '千歳坂',
            ],
            [
                'name' => '幸坂',
            ],
            [
                'name' => '姿見坂',
            ],
            [
                'name' => '常盤坂',
            ],
            [
                'name' => '弥生坂',
            ],
            [
                'name' => '東坂',
            ],
            [
                'name' => '基坂',
            ],
            [
                'name' => '日和坂',
            ],
            [
                'name' => '八幡坂',
            ],
            [
                'name' => '大三坂',
            ],
            [
                'name' => 'チャチャ登り',
            ],
            [
                'name' => '二十間坂',
            ],
            [
                'name' => '南部坂',
            ],
            [
                'name' => '谷地坂',
            ],
            [
                'name' => '護国神社坂',
            ],
            [
                'name' => 'あさり坂',
            ],
            [
                'name' => '青柳坂',
            ],
        ]);
    }
}
