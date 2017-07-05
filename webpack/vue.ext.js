const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default']
        }),
    ],
};