const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        v1: "./src/v1.js",
        original: "./src/original.js"
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
          MiniCssExtractPlugin.loader, // Extracts CSS into seperate file
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS
          "postcss-loader" // Magic
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
};