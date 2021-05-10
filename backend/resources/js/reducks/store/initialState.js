// Storeで管理するstateの初期状態を定義する

const initialState = {
    users: {
        isSignedIn: false,
        uid: '',
        username: '',
        img: '',
    },
    loading: {
        isBeingLoaded: false,
        text: '',
    },
    categories: {
        list: [
            {
                id: 1,
                name: '魚見坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/1.jpeg',
                address: '函館市入舟町',
                description:
                    '函館の坂で最も西側に位置する。回遊してくる魚群を見るのに便利な場所だったことから名づけられた。天候がよければ、青い海と駒ヶ岳を望むことができる穏やかな通りである。',
            },
            {
                id: 2,
                name: '船見坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/2.jpeg',
                address: '函館市船見町',
                description:
                    '「船見町」誕生時に現在の名前になった。港を行き来する船がよく見えることが由来である。坂の途中には、その特徴的な姿から映画ロケで使用されることが多い大正湯がある。',
            },
            {
                id: 3,
                name: '千歳坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/3.jpeg',
                address: '函館市船見町',
                description:
                    '明治12年の函館大火以後にできた坂。かつて坂の東側にあった神社の松の木にちなんで名前がついた。突き当たりには東本願寺船見支院、実行寺、称名寺など、歴史ある寺が並ぶ。',
            },
            {
                id: 4,
                name: '幸坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/4.jpeg',
                address: '函館市船見町',
                description:
                    '1875（明治8）年、坂下の湾を埋め立てた場所が幸町という名前だったことからこの名前がついた。傾斜が厳しい道だが、上りきった先の山上大神宮から眺める景色はまさに絶景。',
            },
            {
                id: 5,
                name: '姿見坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/5.jpeg',
                address: '函館市弥生町',
                description:
                    '港の西埠頭からまっすぐに山へ伸びる坂。かつて存在した遊郭の女性たちを見ることができたことから、この名前がついた。上りきった場所から見る景色は、隠れたビュースポット。',
            },
            {
                id: 6,
                name: '常盤坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/6.jpeg',
                address: '函館市大町',
                description:
                    '「芝居町の坂」や「見返り坂」など、かつての繁栄を偲ばせる多くの通称がついていた坂。現在は閑静な住宅街。和洋折衷の特徴を持つ民家も多数建ち並ぶ。',
            },
            {
                id: 7,
                name: '弥生坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/7.jpeg',
                address: '函館市大町',
                description:
                    '函館の主要な坂の中では最長。かつては2本の坂だったが、1879（明治12）年の大火後現在のような1本の坂となった。この時、地域の繁栄・発展を祈り「弥生」の名がついた。',
            },
            {
                id: 8,
                name: '東坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/8.jpeg',
                address: '函館市大町',
                description:
                    '最大斜度は14.36度と厳しいが、上りきってから一望できる函館港の景色は、一見の価値あり。途中、北海道内最古の写真館・旧小林写真館や、中華会館がある。',
            },
            {
                id: 9,
                name: '基坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/9.jpeg',
                address: '函館市末広町',
                description:
                    '明治時代に里数を測る基点となる「里程元標」が立ったことからこの名前がついた。坂を上りきったところには、元町公園や旧函館区公会堂など有数の観光スポットがある。',
            },
            {
                id: 10,
                name: '日和坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/10.jpeg',
                address: '函館市末広町',
                description:
                    '函館港の旧桟橋から船魂神社まで、まっすぐに伸びている坂。かつては広い港を一望でき、空模様をよく判断できたことからこの名前がついた。道端のアジサイが和の雰囲気を演出。',
            },
            {
                id: 11,
                name: '八幡坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/11.jpeg',
                address: '函館市末広町',
                description:
                    '函館山からの夜景と並んで、函館のビュースポットとして紹介されることが多い坂。かつてこの坂を上りきったところに函館八幡宮があったとされ、名前の由来となっている。',
            },
            {
                id: 12,
                name: '大三坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/12.jpeg',
                address: '函館市末広町',
                description:
                    '和洋折衷の建物と石畳のエキゾチックさが高い評価を受け、国土交通省が定めた「日本の道100選」に認定された坂。特に秋が深まるナナカマドの紅葉の時期は風情があって美しい。',
            },
            {
                id: 13,
                name: 'チャチャ登り',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/13.jpeg',
                address: '函館市末広町',
                description:
                    '「チャチャ」とは「おじいさん」の意。あまりにも急な坂で誰もが腰を曲げて登ることから名付けられたそう。上り切って振り返ると、教会を含む函館らしい絶景を拝むことができる。',
            },
            {
                id: 14,
                name: '二十間坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/14.jpeg',
                address: '函館市末広町',
                description:
                    'その名の通り、道幅が二十間（約36メートル）ある。何度も函館を襲った大火に備えて整備されたもの。冬期にはライトアップされ、明治館前まで続くイルミネーションを楽しめる。',
            },
            {
                id: 15,
                name: '南部坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/15.jpeg',
                address: '函館市末広町',
                description:
                    '地域交流まちづくりセンターがふもとにあり、イチョウ並木が洋風の雰囲気を醸し出す坂道。交差点を1つ2つと越えると傾斜が急になり、上りきるとロープウェイ山麓駅がある。',
            },
            {
                id: 16,
                name: '谷地坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/16.jpeg',
                address: '函館市宝来町',
                description:
                    'かつて行楽地として市民に親しまれた谷地頭方面へ向かう坂。1934（昭和9）年の大火の影響はあるものの、その様子は江戸時代からそれほど変化していないといわれている。',
            },
            {
                id: 17,
                name: '護国神社坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/17.jpeg',
                address: '函館市宝来町',
                description:
                    '幅が広く、函館山の山頂がよく見える坂。突き当たりには函館護国神社があり、坂の名の由来にもなっている。周辺には和洋折衷の建物が多い。ふもとには高田屋嘉兵衛像がある。',
            },
            {
                id: 18,
                name: 'あさり坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/18.jpeg',
                address: '函館市宝来町',
                description:
                    '明治11年に行った発掘調査で、古代人が食べたアサリの貝殻が多く見つかったことから、この名がついたとされる坂。起点の交差点には、すき焼きの名店「阿さ利本店」がある。',
            },
            {
                id: 19,
                name: '青柳坂',
                img: 'https://hakodate-slopes.s3-ap-northeast-1.amazonaws.com/categories/19.jpeg',
                address: '函館市青柳町',
                description:
                    '民家が建ち並ぶ閑静な坂道で、登り切った先には青柳小学校、青柳（旧潮見）中学校、函館公園がある。振り返ると海を見ることができ、青空が広がる日の散策は特に気持ちいい。',
            },
        ],
    },
    tags: {
        list: [],
    },
    alert: {
        displayAlert: false,
        displayMessage: false,
        text: '',
    },
};

export default initialState;
