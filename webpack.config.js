const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        './src/index.ts'
    ],
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'js/bundle.js'
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
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }, {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader', options: {
                            name: '[path][name].[ext]',
                            outputPath: 'images/',
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    },
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Promises vs. Observables',
            filename: 'index.html'
        })
    ]
};