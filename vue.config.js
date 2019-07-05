const webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
   ? '/dist/'
   : '/',
  css:{
    loaderOptions:{
      less:{
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {//引入jquery
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery"
      })
    ]
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
    'iView'
  ]
}
