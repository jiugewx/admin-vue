// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

var base = {
    assetsSubDirectory: 'static', // 静态资源
    assetsPublicPath: '/',
    cssFileName: 'style/[name].css?[contenthash:8]',
    imageFileName: "images/[name].[hash:8].[ext]?[hash:8]",
    fontsFileName: "fonts/[name].[sha512:hash:base64:8].[ext]?[hash:8]"
};

module.exports = {
    dist: {
        env: "production",
        jsFileName: "js/[name].js?[chunkhash:12]",
        assetsRoot: path.resolve(__dirname, '../dist'),
        productionSourceMap: false,
        productionGzip: false,
        assetsSubDirectory: base.assetsSubDirectory,
        assetsPublicPath: base.assetsPublicPath,
        cssFileName: base.cssFileName,
        imageFileName: base.imageFileName,
        fontsFileName: base.fontsFileName
    },

    dev: {
        env: "development",
        autoOpenBrowser: true,
        port: 9090,
        proxyTable: {},
        cssSourceMap: false,
        jsFileName: "js/[name].js?[hash:8]", // hash是编译的指纹,chunkhash是模块的指纹
        assetsSubDirectory: base.assetsSubDirectory,
        assetsPublicPath: base.assetsPublicPath,
        cssFileName: base.cssFileName,
        imageFileName: base.imageFileName,
        fontsFileName: base.fontsFileName
    }
};
