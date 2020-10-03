const fs = require('fs');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: Put this in an utils
// build multiple HTML files dynamically and push entries in chunks
let templates = [];
let dir = 'src/templates';
let files = fs.readdirSync(dir);

files.forEach((file) => {
  if (file.match(/\.html$/)) {
    let filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        filename: filename + 'html',
        template: dir + '/' + filename + 'html',
        chunks: ['application', `${filename.replace(/\./g, '')}`],
      }),
    );
  }
});

module.exports = {
  entry: {
    application: './src/app/application.js',
    home: './src/app/pages/home.js',
    product: './src/app/pages/product.js',
  },
  resolve: {
    alias: {
      '@stylesfolder': path.resolve(__dirname, 'src/sass/'),
      '@imgfolder': path.resolve(__dirname, 'src/assets/images'),
    },
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attributes: {
              list: [
                {
                  attribute: 'src',
                  type: 'src',
                },
              ],
            },
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('tailwindcss')({
                  config: './tailwind.config.js',
                }),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 3 versions', 'ie >9'],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('tailwindcss')('./tailwind.config.js'),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 3 versions', 'ie >9'],
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new LodashModuleReplacementPlugin(),
    new SVGSpritemapPlugin('src/assets/images/icons/*.svg', {
      styles: path.join(
        __dirname,
        'src/sass/abstracts/_sprites.scss',
      ),
    }),
    ...templates,
  ],
};
