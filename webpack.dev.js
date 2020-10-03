const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    pathinfo: false,
    // publicPath: 'http://cdn.example.com/assets/',
  },
  devServer: {
    index: 'home.html',
    port: 8000,
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
    overlay: true,
    compress: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'images',
              // publicPath: 'http://cdn.example.com/assets/images/',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
