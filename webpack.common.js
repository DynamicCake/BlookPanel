const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    externals: {
        './lib/': 'library'
    }
    /*optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                // exclude: /fileToExclude\.js/,
                terserOptions: {
                    compress: {
                        dead_code: false,
                    },
                },
                test: /\/lib\//
            }),

        ],
    }*/
}

console.log("common")