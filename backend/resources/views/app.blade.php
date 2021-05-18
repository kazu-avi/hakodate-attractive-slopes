<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>HAKODATE ATTRACTIVE SLOPES</title>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@ProAnc" />
    <meta property="og:url" content="https://hakodate-slopes.com" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="HAKODATE ATTRACTIVE SLOPES" />
    <meta property="og:description" content="函館の１９の坂道をもっと楽しむための写真投稿サイト" />
    <meta property="og:site_name" content="HAKODATE ATTRACTIVE SLOPES" />
    <meta property="og:image" content="https://hakodate-slopes.com/images/logo.png?85478b41049f0c9f1ed73e85495b42a1" />
    <script src="{{ mix('js/app.js') }}" defer></script>
    <link rel=”shortcut icon” href=”https://hakodate-slopes.com/img/favicon.ico” />
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app"></div>
</body>
</html>
