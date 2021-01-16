const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isProd = env.NODE_ENV === 'prod';
  const mode = isProd ? 'production' : 'development';

  return {
    mode: mode,
    entry: './src/main.ts',
    devtool: isProd ? 'none' : 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].bundle.js'
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        { test: /\.ts?$/, loader: "ts-loader" }
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
      port: 9000,
      historyApiFallback: true
    }
  };
};
