const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isProd = env.NODE_ENV === 'prod';
  const mode = isProd ? 'production' : 'development';

  return {
    mode: mode,
    entry: './src/main.js',
    devtool: isProd ? 'none' : 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.txt$/,
          use: {
            loader: 'raw-loader',
            options: { esModule: false }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env'
                  ]
                ],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-private-methods'
                ]
              }
            },
            {
              loader: './loaders/my-custom-loader'
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'DEFAULT TITLE'
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
  };
};
