const path = require('path');

/*** Define your entry file within the Object below via the entry property. **/

module.exports = {
    mode: 'development',
    entry: './src/modules/observablessync-vs-async.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};