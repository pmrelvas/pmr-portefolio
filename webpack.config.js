const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: [
    './src/js/home-script.js',
    './src/js/nav-bar-script.js',
    './src/js/snake-script.js',
    './src/js/about-me-script.js',
    './src/js/experience-script.js'
  ],
  output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
  },
  module: {
      rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              }
          }
      }]
  }
}