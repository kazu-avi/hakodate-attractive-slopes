<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Portfolio</title>
    <link rel="icon" href="https://hakodate-slopes.com/img/favicon.ico" />
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css">
    <link href="../../css/pf.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet">
</head>
<body>
    <header id="header">
        <nav>
            <ul class="header-nav">
                <li><a href="/portfolio#fv">Top</a></li>
                <li><a href="/portfolio#about">About</a></li>
                <li><a href="/portfolio#service">Service</a></li>
                <li><a href="/portfolio#skills">Skills</a></li>
                <li><a href="/portfolio#footer">Contact</a></li>
            </ul>
        </nav>
    </header>
    <section id="modal" class="modal-close">
        <div class="modal-contents">
            <a id="js-close-btn" class="button" href="">× Close</a>
            <div class="tl">
                <ul class="tl-list">
                    <li class="tl-list-item">
                        <div class="tl-date">1990</div>
                        <div class="tl-contents">
                            <p class="tl-title">函館市生まれ</p>
                            <p class="tl-text">親の転勤の都合で、５歳で函館を離れる。</p>
                        </div>
                    </li>
                    <li class="tl-list-item">
                        <div class="tl-date">2006</div>
                        <div class="tl-contents">
                            <p class="tl-title">狭山ヶ丘高（埼玉県）入学</p>
                            <p class="tl-text">アメリカンフットボール部所属。</p>
                        </div>
                    </li>
                    <li class="tl-list-item">
                        <div class="tl-date">2009</div>
                        <div class="tl-contents">
                            <p class="tl-title">明治大学国際日本学部入学</p>
                            <p class="tl-text">英語と、世界から見た日本や日本文化、海外との違いなどを学ぶ。準体育会フライングディスク部所属。</p>
                        </div>
                    </li>
                    <li class="tl-list-item">
                        <div class="tl-date">2013</div>
                        <div class="tl-contents">
                            <p class="tl-title">株式会社エス・ティー・ワールド入社</p>
                            <p class="tl-text">2年間の店舗勤務ののち、本社にて法人営業、新規事業営業、海外添乗、そしてWEBチームとしてページ制作のディレクションやマーケティングを経験する。</p>
                        </div>
                    </li>
                    <li class="tl-list-item">
                        <div class="tl-date">2016</div>
                        <div class="tl-contents">
                            <p class="tl-title">自家焙煎珈琲店（美瑛町）入社</p>
                            <p class="tl-text">家族経営の珈琲店の唯一の従業員として、店舗業務全般（ホール接客、仕込み、通信販売の発送、販売、パン製造）を経験する。</p>
                        </div>
                    </li>
                    <li class="tl-list-item">
                        <div class="tl-date">2019</div>
                        <div class="tl-contents">
                            <p class="tl-title">株式会社鹿島総研入社</p>
                            <p class="tl-text">以前所属した株式会社エス・ティーワールドの在宅勤務部門に入社し、ウェディング旅行関係のホームページ更新、ツアー作成、SNS運用を経験する。同時に開業準備を進める。</p>
                        </div>
                    </li>
                    <li class="tl-list-item">
                        <div class="tl-date">2020</div>
                        <div class="tl-contents">
                            <p class="tl-title">ANCHOR COFFEE（函館市弥生町）開業</p>
                            <p class="tl-text">珈琲豆の焙煎、販売、配達を行う焙煎所を開業。</p>
                        </div>
                    </li>
                    <li class="tl-list-item">
                        <div class="tl-date">2020末</div>
                        <div class="tl-contents">
                            <p class="tl-title">本格的なプログラミング学習を開始</p>
                            <p class="tl-text">HTML/CSSを扱う経験は少しあったが、JavaScript、PHP、フレームワーク、ライブラリ、コンピューターサイエンスの勉強を開始し、現在に至る。</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <main>
        <section id="fv" class="center">
            <div class="fv-box">
                <h1>Portfolio</h1>
                <h2>Kazuki Goto</h2>
                <a class="scroll-btn" href="/portfolio#about"><span class="scroll-btn-top"></span></a>
            </div>
        </section>
        <section id="about">
            <div class="about-container wrapper">
                <div class="about-img" >
                    <img src="../../images/profile.jpg" alt="プロフィール画像">
                </div>
                <div class="about-info">
                    <h3>About</h3>
                    <p class="section-sub">未経験から独学でエンジニアを目指している30歳です</p>
                    <p class="section-text">1990年、函館市で生まれました。明治大学国際日本学部を卒業後、旅行会社にて3年間勤務。その後、北海道美瑛町の自家焙煎珈琲店にて3年半の修行後に函館にて自身の珈琲豆焙煎所を開業しました。将来的に珈琲とWEB系の2本柱を立てて生活していきたいと考え、WEB系エンジニアへの就職を目指しながら、日々勉強を続けています。</p>
                    <p class="section-text">資格：PHP7初級技術者認定試験　合格</p>
                    <a id="js-open-btn" class="button" href="">経歴を詳しく　＞</a>
                </div>
            </div>
        </section>
        <section id="reason">
            <div class="wrapper">
                <div class="reason-container">
                    <div class="reason-box">
                        <div class="reason-title">なぜエンジニアなのか？</div>
                        <ul class="section-text">
                            <li>旅行会社勤務の3年目に社内のWEBチームに配属となり、ディレクションや解析、広告の運用等を担当しました。約１年間、新規サービスを立ち上げる経験や、社内エンジニアやデザイナーの方と、新しいページを作り上げていく経験を重ねていきました。</li>
                            <li>WEBの力で会社・現場の課題を解決したり、売り上げを上げるために貢献することの面白さや、新たなものを生み出す楽しさからこの職業を魅力的に感じ、「やりたい」という気持ちに変わっていきました。</li>
                            <li>旅行会社退職後は珈琲の勉強に集中し、開業後の今年から本格的に独学でプログラミングの勉強を開始し、未熟ながらWEBアプリケーションを作り上げる経験をいたしました。難しさも感じましたが、同時に作り上げる面白さも感じ、より成長して貢献していきたいという決意を新たにしております。</li>
                        </ul>
                    </div>
                    <div class="reason-box">
                        <div class="reason-title">なぜ珈琲とエンジニアを両立させたいのか？</div>
                        <ul class="section-text">
                            <li>接客が好きで小さな喫茶のオープンを目指して飲食の道へ進み、現在は独立して珈琲豆の販売からスタートさせています。</li>
                            <li>喫茶は季節、人流、社会情勢によって売り上げが大きく変動する少々す安定な業態です。そのため、開業前より珈琲の仕事の他にもう一本の柱を立てて仕事をするスタイルが必要と考えて両立を目指しておりました。</li>
                            <li>しっかりとエンジニアとして力をつけられれば、働く場所や時間にとらわれにくい職業であるため、目指す仕事のスタイルが実現できると考えております。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section id="commit">
            <div class="inner-wrapper">
                <div class="center">
                    <h3>Commit</h3>
                    <p class="section-sub-center">お約束</p>
                </div>
                <div class="commit-container">
                    <div class="commit-box">
                        <h5>成長とチャレンジを続けること</h5>
                        <p class="section-text black">これまで、海外ホームステイや旅行関係の国家試験の独学での合格、海外バックパッカー、飲食への転職と開業など、新たなことへのチャレンジと成長を続けてきました。エンジニア職でも、まだ未熟ですが、<span class="bold">お客様のため、そして良いものを生み出すために、技術面、思考面でも新たなチャレンジと成功を続け、貢献することをお約束いたします。</span></p>
                    </div>
                    <div class="commit-box">
                        <h5>しっかりとコミュニケーションをとること</h5>
                        <p class="section-text black">旅行会社での個人、法人営業や添乗の経験、飲食業での接客の経験の中で、お相手の気持ちを考えて行動し、コミュニケーションをとることの重要性を感じ、その気持ちを大事に仕事を続けてきました。<span class="bold">様々な方の立場に立ち、しっかりと考え、お客様・社内・チーム内と良いコミュニケーションをとることをお約束いたします。</span></p>
                    </div>
                </div>
            </div>
        </section>
        <section id="service">
            <div class="service-container wrapper">
                <div class="service-info">
                    <h3>Service</h3>
                    <p class="section-sub" >独学で勉強したことを生かし、Webサービスを作りました。</p>
                    <p class="section-text" >イチからWebサービス開発をすることでより成長したいため、そして必要とされるサービスを考え、作ることはエンジニアとして成長していくために不可欠と考え、サービス開発を行いました。函館の１９本ある坂道をもっと楽しむための画像投稿・紹介サービスです。函館西部地区の坂道は有名だけど、どんな魅力があって、どんな違いがあるか発信し切れていないと感じ、コロナ明けの函館が観光でより盛り上がるためにこのようなサービスが必要ではないかと考え、制作しました。せひご覧くださいませ。</p>
                    <a class="button" href="/portfolio#skills">使用技術など　＞</a>
                    <a class="button bg-blue" href="https://hakodate-slopes.com/" target="_blank">公開サイト　＞</a>
                </div>
                <div class="service-img">
                    <img src="../../images/service.png" alt="サービス画像">
                </div>
            </div>
        </section>
        <section id="skills">
            <div class="wrapper">
                <div class="center">
                    <h3>Skills & Study</h3>
                    <p class="section-sub-center">このサービスを作るにあたって、使用した技術をご紹介いたします。</p>
                </div>
                <div>
                    <ul class="skills-container">
                        <li class="skills-box">
                            <h4>設計</h4>
                            <p class="icon"><i class="fas fa-tools fa-6x"></i></p>
                            <p class="section-text">作りたいサービスの概要が固まってから、必要な機能の洗い出し→APIのURI設計→ワイヤーフレームの作成（手書き）→ER図の作成を行いました。その他は実装しながら考えていき時間がかかってしまったので、この時点で使用するロジックの部分を考えられていればよりスムーズに進められたと思っております。</p>
                        </li>
                        <li class="skills-box">
                            <h4>主な機能</h4>
                            <p class="icon"><i class="fas fa-running fa-6x"></i></p>
                            <ul class="section-text">
                                <li>ユーザー登録、ログイン機能、ゲストログイン機能</li>
                                <li>ユーザー編集機能（名前、アバター画像）</li>
                                <li>投稿作成、編集、削除機能（画像アップロード、コメント、タグ、カテゴリー）</li>
                                <li>画像のトリミング機能</li>
                                <li>いいね（「行きたい」）機能（非同期でつけ外し）</li>
                                <li>投稿の一覧表示（新着順、ランダム）</li>
                                <li>投稿の詳細表示、コメント機能</li>
                                <li>マイページ機能（自分の投稿、いいねした投稿表示）</li>
                                <li>Twitter, Facebookへの投稿シェア機能</li>
                            </ul>
                        </li>
                        <li class="skills-box">
                            <h4>フロントエンド</h4>
                            <p class="icon"><i class="fab fa-react fa-6x"></i></p>
                            <p class="section-text">画像の投稿や表示の多いサービスのため、画面推移やサーバーからのレスポンス待ちのストレスが少しでも軽減するようにSPAで構築しました。そのため、JavaScriptのライブラリであるReactを採用し、Hooksや状態管理にはReduxを使用しました。また、CSSの他にUIライブラリ（Material-UI）を使用し、UIの向上にも努めました。</p>
                        </li>
                        <li class="skills-box">
                            <h4>バックエンド</h4>
                            <p class="icon"><i class="fab fa-laravel fa-6x"></i></p>
                            <p class="section-text">勉強してきたPHPのフレームワークであるLaravelを使用し、フロントサイドからのリクエストに対して必要な情報だけを返すAPIサーバーとして構築しました。書籍で学んだRESTful APIの原則に基づいて作成しています。認証機能は、自身の理解を深めるために、そしてRESTAPIの原則に反するセッションを使用しないために、Laravelに備わっている標準認証機能は使わずに、JWTトークンをAPIで返す形で実装しました。</p>
                        </li>
                        <li class="skills-box">
                            <h4>データベース</h4>
                            <p class="icon"><i class="fas fa-database fa-6x"></i></p>
                            <p class="section-text">MySQLを使用しました。SQL文も一通り勉強しましたが、今回はLaravelのクエリビルダやEloquent ORMを使ってデータベースを扱いました。開発前にER図を作成し、リレーションを整理してから進めました。ER図はGitHubのREADMEに載せております。</p>
                        </li>
                        <li class="skills-box">
                            <h4>インフラ・サーバー</h4>
                            <p class="icon"><i class="fab fa-aws fa-6x"></i></p>
                            <p class="section-text">レスポンス速度の速さ、そして実務での使用も多いと考え、インフラはAWSを使用しデプロイまで行いました。EC2を使ってWEBサーバーを構築し、Route53で取得したドメインで公開しています。また、そのドメインを使用し。ACMで証明書を取得、ALBと紐付けてHTTPSかしています。投稿した画像は、S3にアップロード保存するように実装しました。</p>
                        </li>
                        <li class="skills-box">
                            <h4>開発環境</h4>
                            <p class="icon"><i class="fab fa-docker fa-6x"></i></p>
                            <p class="section-text">ローカル開発環境は実務でもよく使われると目にしていたDocker / Docker-compose を使用しました。またコードの視認性を上げ、明らかなエラーを未然に防ぐために、GitへのPUSH前にESLintとPrettierでフォーマットを揃えるように致しました。</p>
                        </li>
                        <li class="skills-box">
                            <h4>意識したこと</h4>
                            <dl class="section-text">
                                <dt>・全体像をつかむ</dt>
                                <dd>フロント、バック、インフラに関わらず、幅広く色々な技術使用にチャレンジしました。もちろん十分に深く学んだとは言えませんが、WEBサービス構築の全体的な流れをつかむことを意識しました。</dd>
                                <dt>・自走力をつける</dt>
                                <dd>スクールに通うなどの方法もありますが、自分で考えて理解する癖をつけるため、わからない部分はQiita、StackOverflowなどの日本語・英語の記事や公式ドキュメントなどを参考に自力で解決させていきました。</dd>
                                <dt>・擬似チーム開発</dt>
                                <dd>ひとりでの開発でしたが、実務を意識して、Git/GitHubでのソース管理、issueを作成し、developブランチを切っての作業、各issue終了後に毎度プルリクエストを意識して行いました。</dd>
                            </dl>
                            <a class="button" href="https://github.com/kazu-avi/hakodate-attractive-slopes" target="_blank">GitHub　＞</a>
                        </li>
                    </ul>
                </div>
                <div class="study-wrapper">
                    <div class="reason-title">To study it</div>
                    <div class="study-contents">
                        <div class="study-box">
                            <h4>①基礎</h4>
                            <p class="section-text">オンライン学習サービスのProgateを進めつつ、書籍も参考にまずは各言語の基礎を勉強しました。
                                その後、まずはHTML/CSS/JavaScriptで20ページほどサイト模写を行い、知識の定着を図りました。
                                同時に、書籍『Webを支える技術』を読み込み、HTTPメソッドや通信の仕組みなど、Web全体の知識を深めていきました。</p>
                            <p class="study-date">2021.1-2</p>
                        </div>
                        <div class="study-box">
                            <h4>②実践</h4>
                            <p class="section-text">PHPとJavaScriptを中心に、実際に手を動かしてAPIや小さなUI（タブなど）を作りながら理解を深めていきました。
                                その後、ネット上の記事や現役エンジニアの方のYoutube動画を参考に、フレームワーク（Laravel）やJSライブラリ（React）の勉強を進めました。
                                また、PHPは「PHP7初級技術者認定試験」に向けた勉強も行い、正答率92.5%で合格いたしました。</p>
                            <p class="study-date">2021.3-4</p>
                        </div>
                        <div class="study-box">
                            <h4>③サービス作成</h4>
                            <p class="section-text">実際にサービスを作成しながら、これまで勉強してきたことの理解を深めていきました。
                                実際に制作を進めていくと、基礎で勉強してきたことの理解が足りなかった部分も多く、都度復習を行いながら進め、勉強してきたことの定着につながりました。
                                自力で解決できないエラーなどは、Web上の記事などの力を借りて、自分の頭で考えながら実装しました。</p>
                            <p class="study-date">2021.4-5</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="others">
            <div class="wrapper">
                <h3 class="center">Others</h3>
                <div class="others-contents">
                    <div class="others-img">
                        <img src="../../images/pf.png" alt="Portfolio">
                        <div class="others-box">
                            <h6>Portfolio</h6>
                            <p class="section-text">現在ご覧いただいているポートフォリオです。デザインはAdobe XDを使用して作成しました。HTML/CSS/JavaScriptを用いて制作いたしました。自分のこれまでと、転職に向け勉強してきたことがしっかりと伝わるよう意識しています。</p>
                            <a class="button" href="/portfolio#fv">サイトへ　＞</a>
                            <a class="button bg-pink" href="" target="_blank">デザインカンプ　＞</a>
                        </div>
                    </div>
                    <div class="others-img">
                        <img src="../../images/anchor.png" alt="ANCHORホームページ">
                        <div class="others-box">
                            <h6>ANCHOR COFFEE Official web</h6>
                            <p class="section-text">自身で運営している珈琲豆販売のオンラインショップです。WordPressのテーマを自身でカスタマイズし、ショップ機能を組み込んで作成いたしました。</p>
                            <a class="button" href="https://anchor-coffee.com/" target="_blank">サイトへ　＞</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="scroll" class="center">
            <a class="scroll-btn" href="/portfolio#fv"><span class="scroll-btn-bottom"></span></a>
        </section>
    </main>
    <footer id="footer">
        <div class="inner-wrapper">
            <div class="footer-contents">
                <p class="section-text white">ここまでご覧いただき、誠にありがとうございました。<br>
                    何卒よろしくお願いいたします。</p>
                <a class="button bg-yellow" href="">Contact　＞</a>
            </div>
            <div class="center">
                <p class="section-text white">&copy;2021 Kazuki Goto</p>
            </div>
        </div>
    </footer>
    <script src="../../js/pf.js"></script>
    <script src="../../js/modal.js"></script>
</body>
</html>
