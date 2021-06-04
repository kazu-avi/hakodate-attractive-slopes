# HAKODATE ATTRACTIVE SLOPES
函館山の麓にある19本の坂道をもっと楽しむための写真投稿・共有サービスです。  
投稿やコメント等のリアクションにはユーザー登録が必要となりますが、登録不要のゲストログイン機能もご用意しております。  
ぜひご覧くださいませ。  
  
### 公開リンク： https://hakodate-slopes.com

### ポートフォリオサイト： https://hakodate-slopes.com/portfolio
  
### トップページ
![service](https://user-images.githubusercontent.com/80322369/120769322-f8af5980-c557-11eb-849a-226acd6f4af8.png)

## 見ていただきたい点・意識した点
- フロントエンド(SPA)
    - Reactを使い、SPAとして開発した点
    - 非同期通信を理解し、実装した点
    - 状態管理にReduxを使用し、propsの受け渡しを少なく実装した点
- バックエンド(APIサーバー)
    - RESTAPIの原則に基づいてAPIサーバーとして構築し、JSONデータを返している点
    - Laravelの標準認証機能を使わずに、JWTトークンを使用した認証機能を実装している点
- インフラ・開発環境
    - 実務での使用を意識し、開発環境はDocker/Docker-composeを、本番環境はAWSを使用した点
    - AWSではALBを通して、常時SSL化を行っている点
- その他
    - チーム開発を意識し、GitHubのissueやブランチを活用している点。
    - 本格的な勉強開始から半年で、自力でサービスを作りあげた経験。


## 使用した技術
- フロントエンド(SPA)
    - HTML/CSS
    - JavaScript
    - React/React Redux
    - Material-UI（UIライブラリ）
    - ESLint/Prettier（コード解析、フォーマット）
- バックエンド(APIサーバー)
    - PHP 7.4
    - Laravel 8
    - PHP Unit（テスト）
    - JWTトークン（認証用トークン）
- インフラ・開発環境
    - Docker/Docker-compose（ローカル開発環境）
    - AWS：VPC、EC2、S3、Route53、ALB、ACM（本番環境）
    - Nginx 1.18.0（Webサーバー）

## 機能
- 基本機能
    - 新規ユーザー登録、ログイン機能
    - ゲストログイン機能
    - 投稿一覧表示（新着順、ランダム、カテゴリー別、タグ別）
    - 投稿詳細表示（写真、説明文、「行きたい！」、タグ、コメント）
    - 投稿シェア機能（Facebook、Twitter）
    
- ログイン後機能
    - 新規投稿作成（画像アップロード、画像トリミング）
    - 「行きたい！」（いいね）機能
    - 投稿の編集、削除
    - 投稿へのコメント機能
    - ユーザー情報編集、削除機能
    - マイページ機能（ユーザー個別投稿、「行きたい！」を付けた投稿の表示）

## ER図
![Entity Relationship Diagram (3)](https://user-images.githubusercontent.com/80322369/120608975-b79e4300-c48c-11eb-89ae-5671c9ba1a12.png)

## AWS構成図
![AWS2 (1)](https://user-images.githubusercontent.com/80322369/120755880-8172c900-c549-11eb-8159-7035af1b2295.png)

## APIのURL設計
  
| URL | メソッド |　要認証　|　内容　|
|---|---|---|---|
| /api/v1/users | GET | | 登録済みユーザー取得 |
| /api/v1/users | POST | | 新規ユーザー登録 |
| /api/v1/users/{ユーザーID} | GET | | 個別ユーザー情報取得 |
| /api/v1/users/{ユーザーID} | PUT | ○ | 個別ユーザー情報編集 |
| /api/v1/users/{ユーザーID} | DELETE | ○ | 個別ユーザー削除 |
| /api/v1/login | POST | | ログイン（トークン発行） |
| /api/v1/refresh | POST | | トークン再発行 |
| /api/v1/me | POST | ○ | 認証ユーザー情報返却 |
| /api/v1/logout | POST | ○ | ログアウト |
| /api/v1/posts | GET | | 投稿一覧の取得 |
| /api/v1/posts | POST | ○ | 新規投稿 |
| /api/v1/posts/r | GET | | 投稿一覧のランダム取得 |
| /api/v1/posts/users/{ユーザーID} | GET | ○ | 個別ユーザーの投稿一覧取得 |
| /api/v1/posts/{投稿ID} | GET | | 個別投稿内容の取得 |
| /api/v1/posts/{投稿ID} | PUT | ○ | 個別投稿の編集 |
| /api/v1/posts/{投稿ID} | DELETE | ○ | 個別投稿の削除 |
| /api/v1/posts/{投稿ID}/comments | POST | ○ | コメント投稿 |
| /api/v1/posts/{投稿ID}/likes | PUT | ○ | 「行きたい！」追加 |
| /api/v1/posts/{投稿ID}/likes | DELETE | ○ | 「行きたい！」削除 |
| /api/v1/posts/{ユーザーID}/likes | GET | ○ | 個別ユーザーの「行きたい！」した投稿一覧取得 |
| /api/v1/categories | GET | | カテゴリー一覧の取得 |
| /api/v1/categories/{カテゴリーID} | GET | | カテゴリー別投稿一覧の取得 |
| /api/v1/tags | GET | | タグ一覧の取得 |
| /api/v1/tags/{タグID} | GET | | タグ別投稿一覧の取得 |  
  
ここまでご覧いただき、誠にありがとうございました。