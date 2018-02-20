const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist/');
const APP_DIR = path.resolve(__dirname, 'app/');

const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: isDevelopmentEnvironment
});

module.exports = {
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  devtool: '#eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },

  module: {
    loaders: [
      { test: /\.(html)$/, loader: 'html-loader',
        options: { minimize: isDevelopmentEnvironment }},
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(css|scss)$/, use: extractSass.extract({
        use: [
          { 'loader': 'css-loader' },
          { 'loader': 'sass-loader' }
        ],
        fallback: "style-loader"
      })}
    ]
  },

  plugins: [
    extractSass
  ]
};
