module.exports = {
    module: {
        rules: [
            {
                test: /\.twig$/,
                use: [
                    "twig-loader",
                    "extract-loader",
                    "html-loader",
                ]
            }
        ]
    },
};