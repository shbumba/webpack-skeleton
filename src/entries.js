const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./../webpack/paths.ext');

module.exports = {
    entry: {
        'index': paths.src.pages + 'index/app.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index/index.html',
            //inject: false,
            chunk: ['index', 'common'],
            template: paths.src.pages + 'index/index.twig'
        })
    ]
};