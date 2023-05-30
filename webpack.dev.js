const path = require('path');
const { merge } = require('webpack-merge');
const common = require("./webpack.common.js")

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'bundle.js'
    },
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'out')
        },
        port: 3000,
        open: true,
        hot: true,

    }
});

console.log("dev")