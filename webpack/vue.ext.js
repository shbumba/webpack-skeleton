const webpack = require('webpack');
const merge = require('webpack-merge');

const envMode = process.env.mode;

let option = {
    plugins: [
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default']
        }),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    "vue-loader"
                ]
            }
        ]
    },
};

if (envMode !== 'dev') {
    option = merge([
        option,
        {
            plugins: [
                 new webpack.DefinePlugin({
                     'process.env': {
                         NODE_ENV: '"production"'
                     }
                 })
            ]
        }
    ])
}

module.exports = option;