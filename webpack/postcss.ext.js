const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.pcss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 },
                        },
                        'postcss-loader',
                    ],
                }),
            }
        ]
    }
};