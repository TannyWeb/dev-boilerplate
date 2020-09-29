const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry: {
      v1: "./src/V1/v1.js",
      control: "./src/Control/control.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      publicPath: "/dist"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, "./src") // Only babelify our code
          ],
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/,
          use: [
            (env === "production" || env === "development") ? MiniCssExtractPlugin.loader : "style-loader", 
            "css-loader", // translates CSS into CommonJS
            "postcss-loader", // Magic
            "sass-loader" // compiles Sass to CSS
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CleanWebpackPlugin() // Deletes the contents of the output on each build
    ]
  }
};