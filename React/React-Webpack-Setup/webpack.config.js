module.exports = {
  entry: './app.js',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  watch: true,
  devServer: {
    inline: true,
    port: 3333
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
      }
    ]
  },
};
