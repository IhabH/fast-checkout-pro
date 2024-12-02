const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")

module.exports = env =>
{
    env = env || {}
    return {
        name: "styles",
        mode: env.production ? "production" : "development",
        entry: {
            main: "./resources/scss/main/_fast-checkout.scss"
        },
        module: {
            rules: [
                {
                    test: /.\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                                sourceMap: !env.production
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: !env.production,
                                postcssOptions: {
                                    plugins: [
                                        require("autoprefixer")()
                                    ]
                                }
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: !env.production,
                                sassOptions:{
                                    outputStyle: env.production ? "compressed" : "nested"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: "../../css/fast-checkout" + (env.production ? ".min" : "") + ".css"
            })
        ],
        output: {
            path: path.resolve(__dirname, "../../resources/js/dist")
        }
    }
}
