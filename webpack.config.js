const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Nodemon = require('nodemon-webpack-plugin');
const WebpackTsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    server: './src/server.ts',
  },
  mode: process.env.NODE_ENV || 'production',
  externals: [nodeExternals()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        server: {
          chunks: 'all',
        },
      },
    },
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [new WebpackTsConfigPathsPlugin()],
    extensions: ['.ts', '.js'],
  },
  target: 'node',
  plugins: [
    new Nodemon({
      script: './dist/server.js',
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: false,
    publicPath: false,
  },
};
