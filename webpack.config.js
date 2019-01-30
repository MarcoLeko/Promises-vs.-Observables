const path = require('path');

/*** Define the source file within the Object below via the entry property.
 *   e.g. entry: './src/modules/callbacks/introduction.ts' **/

module.exports = {
    mode: 'development',
    entry: './src/modules/callbacks/introduction.ts',
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