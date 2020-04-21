const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/index.js'
    ],
    'modules/discount-code/index': [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/modules/discount-code/index.js'
    ],
    'modules/discount-redemption-split/index': [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/modules/discount-redemption-split/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            attrs: ['img:src','link:href','image:xlink:href','use:xlink:href']
          }
          //options: { minimize: true }
        }]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
            outputPath: 'img/'
          }
        }]
      }
    ]
  },
  target: 'web',
  devtool: 'source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      chunks: ['main'],
      excludeChunks: ['server']
    }),
    new HtmlWebPackPlugin({
      template: "./src/modules/discount-code/html/index.html",
      filename: "./modules/discount-code/index.html",
      chunks: ['modules/discount-code/index'],
      excludeChunks: ['server']
    }),
    new HtmlWebPackPlugin({
      template: "./src/modules/discount-redemption-split/html/index.html",
      filename: "./modules/discount-redemption-split/index.html",
      chunks: ['modules/discount-redemption-split/index'],
      excludeChunks: ['server']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
