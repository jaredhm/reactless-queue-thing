const path = require("path");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");


module.exports = {
    entry: "./www/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "static")
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            util: path.resolve(__dirname, "www/util")
        }
    },
    plugins: [
        new MomentLocalesPlugin()
    ]
};