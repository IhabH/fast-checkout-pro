const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const WebpackRequireFrom = require("webpack-require-from")

module.exports = env =>
{
    env = env || {}
    return {
        name: "client",
        mode: env.production ? "production" : "development",
        entry: "./resources/js/src/entry-client.js",
        output: {
            filename: "fastCheckout" + (env.production ? ".min" : "") + ".js",
            chunkFilename: "chunks/fastCheckout-[id]" + (env.production ? ".min" : "") + ".js",
            path: path.resolve(__dirname, "..", "..", "resources/js/dist/")
        },
        resolve: {
            alias: {
                vue: "vue/dist/vue" + (env.production ? ".min" : "") + ".js",
                ceres: path.join(__dirname, "..", "..", "node_modules/Ceres/resources/js/src")
            }
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        cache: true,
                        fix: env.production
                    }
                },
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
            new WebpackRequireFrom({
                replaceSrcMethodName: "__loadPluginChunk"
            })
        ]
    }
}
