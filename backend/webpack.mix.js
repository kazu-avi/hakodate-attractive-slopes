const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .version()
    .postCss('resources/css/app.css', 'public/css');


//本番環境ではESLintは使用しません
if (!mix.inProduction()) {
    mix.webpackConfig({
        module: {
            stats: {
                children: true
            },
            rules: [
                {
                    enforce: 'pre',
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    test: /\.(js|jsx)?$/,
                    options: {
                        fix: true,
                        cache: false,
                    }
                }
            ]
        }
    })
};
