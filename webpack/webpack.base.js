const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const webpackBase = {
  getDevTool: () => {
    return process.env.NODE_ENV === "production" ? false : "eval";
  },

  getRules: () => {
    return [
      {
        test: /\.(eot|ttf|woff|woff2|svg|png|gif|jpe?g)$/,
        exclude: /(node_modules)/,
        use: ["file-loader"]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-loader',
          }
        ]
      }
    ];
  },

  getPlugins: () => {
    const plugins = [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      })
    ];

    if (process.env.NODE_ENV === "production") {
      plugins.concat([new webpack.optimize.ModuleConcatenationPlugin()]);
    }

    return plugins;
  },

  getExtensions: () => {
    return [".js", ".jsx", ".tsx", ".ts"];
  }
};

module.exports = webpackBase;
