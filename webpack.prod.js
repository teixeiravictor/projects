const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  watch: false,
  devtool: 'source-map',
  output: {
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    pathinfo: false,
    // publicPath: 'http://cdn.example.com/assets/',
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
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
              name: '[name]-[hash:7].[ext]',
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
      filename: '[name]-[contenthash].css',
    }),
  ],
});
