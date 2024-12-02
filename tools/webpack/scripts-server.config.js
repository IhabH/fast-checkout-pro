const path = require("path")
const webpack = require("webpack")
const ESLintPlugin = require("eslint-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = env =>
{
    env = env || {}
    return {
        name: "sever",
        mode: env.production ? "production" : "development",
        entry: "./resources/js/src/entry-server.js",
        target: "node",
        output: {
            filename: "fastCheckout-server" + (env.production ? ".min" : "") + ".js",
            path: path.resolve(__dirname, "..", "..", "resources/js/dist/"),
            libraryTarget: "commonjs2"
        },
        resolve: {
            alias: {
                vue: "vue/dist/vue" + (env.prod ? ".min" : "") + ".js",
                ceres: path.join(__dirname, "..", "..", "node_modules/Ceres/resources/js/src")
            }
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader"
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin({
                exposeFilename: true
            }),
            new ESLintPlugin({
                extensions: ["js", "vue"],
                context: path.resolve(__dirname, "..", "..", "resources/js/src/"),
                fix: true
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ],
        optimization: {
            chunkIds: "natural",
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                })
            ]
        }
    }
}
