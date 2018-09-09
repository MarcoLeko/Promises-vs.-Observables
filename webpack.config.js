const path = require('path');

module.exports = {
    entry: [
        './src/config.ts',
        './src/index.ts'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        hot: true
    }
};