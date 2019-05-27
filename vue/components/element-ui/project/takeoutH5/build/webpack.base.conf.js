var path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/flashcarry/static/static/',
    filename: '[name].js'
  },
  externals: {
  'aUrl' : ' "http://192.168.0.1" '
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.less'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'vux-components': 'vux/src/components/'
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.less$/,
        loader: 'css!less'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|woff|ttf|svg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    }
  }
}
