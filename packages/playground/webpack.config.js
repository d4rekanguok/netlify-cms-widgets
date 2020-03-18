const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const distDir = path.join(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: distDir,
    filename: 'bundle.js',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'module',
            presets: [
              ['@babel/preset-env', { targets: { esmodules: true }}], 
              '@babel/preset-react'
            ],
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlPlugin(),
    new CopyPlugin([{
      from: path.join(__dirname, './static/**/*'),
      to: path.join(distDir, '/[name].[ext]'),
    }])
  ],
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 9000,
  }
}