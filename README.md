# HAKODATE ATTRACTUVE SLOPES
函館の西部地区にある有名な坂道１９箇所の魅力をもっと発見、発信し、  
魅力に思って訪問する人が増えるような写真＋コメントの投稿アプリ  

## 機能
写真の一覧を表示する（トップページ）  
写真の詳細を表示する（詳細ページ）  
会員登録する  
ログインする  
ログアウトする  
写真を投稿する（投稿ページ/ログインユーザーのみ）  
投稿を編集する（マイページ）  
投稿を削除する（マイページ）  
写真にカテゴリー（坂道名）を付ける（ログインユーザーのみ）  
写真にタグを付ける（ログインユーザーのみ）  
写真に「行きたい！」（いいね）を付ける（ログインユーザーのみ）  
写真から「行きたい！」を外す（ログインユーザーのみ）  
写真に「行ったよ！」をつける（ログインユーザーのみ）  
写真にコメントをつける（ログインユーザーのみ）  
写真につけられた「行きたい！」の数を表示する  
写真に付けられたコメントを表示する（詳細ページ）  
自分が投稿した写真を表示する（マイページ）  
自分が「行きたい」を付けた写真を表示する（マイページ）  
自分が「行ったよ」を付けた写真を「行きたい」から外し、訪問済みとして表示する（マイページ）  
投稿された写真をシェアする  

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