const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {addWebpackConfig} = require('@shopify/post-purchase-ui-react/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = addWebpackConfig(
  {
    entry: './src/index.js',
    resolve: {
      alias: {
        '@shopify/post-purchase-ui-extensions-react':
          '@shopify/post-purchase-ui-react',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({template: 'index.html'}),
      ...(isProduction ? [new MiniCssExtractPlugin()] : []),
    ],
  },

  {preact: false},
);
