const webpack = require("webpack");
const path = require("path");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    publicPath: "/",
    contentBase: "./assets",
    watchContentBase: true
  },
  entry: {
    main: [
      path.resolve(__dirname, "src/main.js"),
      path.resolve(__dirname, "src/index.html"),
      path.resolve(__dirname, "src/styles.scss")
    ]
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",

        options: {
          plugins: ["syntax-dynamic-import"],

          presets: [
            [
              "@babel/preset-env",
              {
                modules: false
              }
            ]
          ]
        },

        test: /\.js$/
      },
      {
        test: /.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.(scss|css)$/,

        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/"
            }
          }
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: "file-loader"
      }
    ]
  },

  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Alyssa Alvarez",
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: [".js"]
  },

  mode: "development",

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};
