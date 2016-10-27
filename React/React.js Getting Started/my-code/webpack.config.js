var webpack = require('webpack');

module.exports = {
  entry: './03-math-game/script.js',
  output: {
    path: './03-math-game/',
    filename: 'bundle.js',
    publicPath: '/js',
    sourceMapFilename: '[file].map'
  },
  watch: true,
  devServer: {
    inline: true,
    port: 3333,
    contentBase: "./03-math-game",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node-modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.css$/,
        loaders: ['style', 'css']
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      }, {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      }, {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      }, {
        test: /\.(eot|ttf|svg|gif|png)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};