var path = require('path')
var webpack = require('webpack')

module.exports = {
  // entry: './lib/http/index.js',
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   publicPath: '/dist/',
  //   // filename: 'build.js',
  //   filename: 'http.min.js',// 打包后输出文件名
  //   library: 'xAxios', // 指定的使用require时的模块名
  //   libraryTarget: 'umd',
  //   umdNamedDefine: true // 对 UMD 的构建过程中的 AMD 模块进行命名
  // },
  entry: './lib/toast/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    // filename: 'build.js',
    filename: 'toast.min.js',// 打包后输出文件名
    library: 'xToast', // 指定的使用require时的模块名
    libraryTarget: 'umd',
    umdNamedDefine: true // 对 UMD 的构建过程中的 AMD 模块进行命名
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-3']
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {},
    extensions: ['*', '.js']
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        API_URL: '"/"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      exclude: /node_modules/
    })
  ])
}