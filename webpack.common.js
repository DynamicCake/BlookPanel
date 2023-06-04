const path = require('path')

module.exports = {
    context: __dirname,
    node: {
        __filename: true
    },
    entry: path.resolve(__dirname, 'src/index.ts'),
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                type: 'asset/source',
            },
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
    /*
    externals: {
        './lib/': 'library'
    },
    */
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