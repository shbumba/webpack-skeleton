const merge = require('webpack-merge');
const webpack = require('webpack');

const paths = require('./webpack/paths.ext');

const extListDev = require('./webpack/ext-list.dev');
const extListProd = require('./webpack/ext-list.dev');

const common = {
    entry: {},
    node: {
        fs: 'empty'
    },
    output: {
        path: paths.build,
        filename: '[name]/app.js',
        publicPath: '/dist'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ]
};

module.exports = function (env) {
    process.env.mode = env;

    if (env === 'dev') {
        return merge([
            common,
            extListDev
        ]);
    } else {
        return merge([
            common,
            extListProd
        ]);
    }
};