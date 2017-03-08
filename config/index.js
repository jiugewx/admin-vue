// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
    dist: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static', // 静态资源
        assetsPublicPath: '/',
        productionSourceMap: false,
        productionGzip: false,
        jsFileName: "js/[name].js?[chunkhash:12]",
    },
    dev: {
        env: require('./dev.env'),
        port: 8888,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false,
        jsFileName: "js/[name].js?[hash:8]", // hash是编译的指纹,chunkhash是模块的指纹
    }
};
