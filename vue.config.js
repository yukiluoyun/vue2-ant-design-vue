// const path = require("path");
module.exports = {
  productionSourceMap: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : './',
  lintOnSave: true, //保存时实用lint进行验证
  css: {
    sourceMap: true //是否开启css  source map
  },
  chainWebpack: (config) => {
    // css相关
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/assets/style/var.scss'
        })
        .end()
    })

    config.module
      .rule('scss')
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({ remUnit: 192, remPrecision: 8, exclude: /node_modules/i }) //flexible 会将一个屏幕分成10个remUnit，所以一个是192
      .end()

    config.plugin('html').tap((args) => {
      args[0].title = 'vue 大数据 空模板'
      return args
    })
  }
}
