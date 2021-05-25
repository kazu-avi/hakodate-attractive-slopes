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
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/1.JPG',
                'address' => '函館市入舟町',
                'description' => '函館市西部地区にある主要な坂の中で、最も西を走るのがこの坂です。回遊してくる魚群を見るのに便利な場所だったことから、名づけられました。/n/n1965（昭和40）年までは、坂上にあった町名から「台町の坂」とも呼ばれていました。町名をたどると、江戸時代後期、現在の函館どつく敷地内に弁天台場を建造した際、採掘した土砂を盛って出来た地を台町と称したのだそうです。そう考えると魚見坂先の地は、国の特別史跡・五稜郭跡と並ぶ、幕末の遺産といえるのかもしれません。/n/n市電の「函館どつく前」電停で下車した先に建つ厳島神社が、坂の始点。道幅18メートルの通りが、ほぼ一定の傾斜で続きます。しばらく行くと左手に見えてくるのが、市内の寺院で最も長い歴史をもつ高龍寺。レンガ造りの外塀、壮大な山門、総ケヤキ造りの本堂……、どれをとってもそのスケールに圧倒されます。門前からは函館湾内や横津連峰の山々だけでなく、天気が良ければ標高1131メートルの駒ヶ岳まで望めます。坂の突き当たりは、さらに道が二股に。その角に建つ個人商店では、通りの先にある外国人墓地を見学した後、ジュースやアイスクリームで渇いたのどを潤す人をよく見かけます。',
            ],
            [
                'name' => '船見坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/2.JPG',
                'address' => '函館市船見町',
                'description' => '今でこそ中学校に突き当たる坂ですが、元々はさらに1本上の通りに建つ称名寺に通じていたため、称名寺の坂と呼ばれていました。さらにそれ以前は、坂下にあった店蔵から「麹（こうじ）屋の坂」、また、急勾配だったために「地獄坂」と呼ばれたこともあります。/n/n1873（明治6）年に「船見町」の町名が誕生したのを機に、坂名は「船見坂」となり、1879（明治12）年の大火後に行われた区画整理では、元々は上半分だけだった坂が、下から上まで真っすぐになりました。現在の長さになったのは、中学校のできた戦後のことです。/n/n電車通りからしばらくは、平坦な道が続きます。大黒通からなだらかな傾斜を進むこと約140メートル、すでに坂全体の半分ちょっとを過ぎたところです。左手に見えるのが、外壁にピンク色を取り入れたレトロな洋風建築の大正湯。その向かいには、明治時代建造の蔵を改装した、落ち着いた雰囲気でおしゃれなランチを楽しめる蕎麦蔵が。数ある坂のうちでも、有数の素朴さです。/n/n坂上へはあっという間に到着。港内を行き交う船は建物の間から瞬間的にしか見えないため、町名通りとはいきませんが、函館どつくでの造船作業に使われているクレー ンの姿は、港町ならではの光景です。',
            ],
            [
                'name' => '千歳坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/3.JPG',
                'address' => '函館市船見町',
                'description' => '明治12年の函館大火以後にできた坂。かつて坂の東側にあった神社の松の木にちなんで名前がついた。突き当たりには東本願寺船見支院、実行寺、称名寺など、歴史ある寺が並ぶ。',
            ],
            [
                'name' => '幸坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/4.JPG',
                'address' => '函館市船見町',
                'description' => '1875（明治8）年、坂下の湾を埋め立てた場所が幸町という名前だったことからこの名前がついた。傾斜が厳しい道だが、上りきった先の山上大神宮から眺める景色はまさに絶景。',
            ],
            [
                'name' => '姿見坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/5.JPG',
                'address' => '函館市弥生町',
                'description' => '港の西埠頭からまっすぐに山へ伸びる坂。かつて存在した遊郭の女性たちを見ることができたことから、この名前がついた。上りきった場所から見る景色は、隠れたビュースポット。',
            ],
            [
                'name' => '常盤坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/6.JPG',
                'address' => '函館市大町',
                'description' => '「芝居町の坂」や「見返り坂」など、かつての繁栄を偲ばせる多くの通称がついていた坂。現在は閑静な住宅街。和洋折衷の特徴を持つ民家も多数建ち並ぶ。',
            ],
            [
                'name' => '弥生坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/7.JPG',
                'address' => '函館市大町',
                'description' => '函館の主要な坂の中では最長。かつては2本の坂だったが、1879（明治12）年の大火後現在のような1本の坂となった。この時、地域の繁栄・発展を祈り「弥生」の名がついた。',
            ],
            [
                'name' => '東坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/8.JPG',
                'address' => '函館市大町',
                'description' => '最大斜度は14.36度と厳しいが、上りきってから一望できる函館港の景色は、一見の価値あり。途中、北海道内最古の写真館・旧小林写真館や、中華会館がある。',
            ],
            [
                'name' => '基坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/9.JPG',
                'address' => '函館市末広町',
                'description' => '明治時代に里数を測る基点となる「里程元標」が立ったことからこの名前がついた。坂を上りきったところには、元町公園や旧函館区公会堂など有数の観光スポットがある。',
            ],
            [
                'name' => '日和坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/10.JPG',
                'address' => '函館市末広町',
                'description' => '函館港の旧桟橋から船魂神社まで、まっすぐに伸びている坂。かつては広い港を一望でき、空模様をよく判断できたことからこの名前がついた。道端のアジサイが和の雰囲気を演出。',
            ],
            [
                'name' => '八幡坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/11.JPG',
                'address' => '函館市末広町',
                'description' => '函館山からの夜景と並んで、函館のビュースポットとして紹介されることが多い坂。かつてこの坂を上りきったところに函館八幡宮があったとされ、名前の由来となっている。',
            ],
            [
                'name' => '大三坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/12.JPG',
                'address' => '函館市末広町',
                'description' => '和洋折衷の建物と石畳のエキゾチックさが高い評価を受け、国土交通省が定めた「日本の道100選」に認定された坂。特に秋が深まるナナカマドの紅葉の時期は風情があって美しい。',
            ],
            [
                'name' => 'チャチャ登り',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/13.JPG',
                'address' => '函館市末広町',
                'description' => '「チャチャ」とは「おじいさん」の意。あまりにも急な坂で誰もが腰を曲げて登ることから名付けられたそう。上り切って振り返ると、教会を含む函館らしい絶景を拝むことができる。',
            ],
            [
                'name' => '二十間坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/14.JPG',
                'address' => '函館市末広町',
                'description' => 'その名の通り、道幅が二十間（約36メートル）ある。何度も函館を襲った大火に備えて整備されたもの。冬期にはライトアップされ、明治館前まで続くイルミネーションを楽しめる。',
            ],
            [
                'name' => '南部坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/15.JPG',
                'address' => '函館市末広町',
                'description' => '地域交流まちづくりセンターがふもとにあり、イチョウ並木が洋風の雰囲気を醸し出す坂道。交差点を1つ2つと越えると傾斜が急になり、上りきるとロープウェイ山麓駅がある。',
            ],
            [
                'name' => '谷地坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/16.JPG',
                'address' => '函館市宝来町',
                'description' => 'かつて行楽地として市民に親しまれた谷地頭方面へ向かう坂。1934（昭和9）年の大火の影響はあるものの、その様子は江戸時代からそれほど変化していないといわれている。',
            ],
            [
                'name' => '護国神社坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/17.JPG',
                'address' => '函館市宝来町',
                'description' => '幅が広く、函館山の山頂がよく見える坂。突き当たりには函館護国神社があり、坂の名の由来にもなっている。周辺には和洋折衷の建物が多い。ふもとには高田屋嘉兵衛像がある。',
            ],
            [
                'name' => 'あさり坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/18.JPG',
                'address' => '函館市宝来町',
                'description' => '明治11年に行った発掘調査で、古代人が食べたアサリの貝殻が多く見つかったことから、この名がついたとされる坂。起点の交差点には、すき焼きの名店「阿さ利本店」がある。',
            ],
            [
                'name' => '青柳坂',
                'img' => 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/19.JPG',
                'address' => '函館市青柳町',
                'description' => '民家が建ち並ぶ閑静な坂道で、登り切った先には青柳小学校、青柳（旧潮見）中学校、函館公園がある。振り返ると海を見ることができ、青空が広がる日の散策は特に気持ちいい。',
            ],
        ]);
    }
}
