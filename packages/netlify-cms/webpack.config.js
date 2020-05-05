const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const plugins = []

if (process.env.ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'netlify-cms.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins,
}