// 使用 nodejs 自带的文件路径


var path = require('path');


module.exports = {


    build: {


        // 使用 confi/prod.env.js 中定义的编译环境


        env: require('./prod.env'),


        index: path.resolve(__dirname, '../dist/index.html'),


        // 编译出的静态资源根路径


        assetsRoot: path.resolve(__dirname, '../dist'),


        // 编译输出的二级目录


        assetsSubDirectory: 'static',


        // 编译发布上线路径的根目录，可配置为资源服务器域名CDN 域名


        assetsPublicPath: '/',


        // 是否开启 cssSourceMap


        productionSourceMap: true,


        // 是否开启 gzip


        productionGzip: false,


        // 需要使用gzip 压缩的文件扩展名


        productionGzipExtensions: ['js', 'css']


    },


    // dev 环境


    dev: {


        //  使用 config/dev.env.js 中定义的编译环境


        env: require('./dev.env'),


        // 运行测试网页的端口


        port: 8080,


        // 编译输出的二级目录


        assetsSubDirectory: 'static',


        //  编译发布上线的根目录，可以配置为资源服务器域名或CDN 域名


        assetsPublicPath: '/',


        // 需要 proxyTable 代理的接口


        proxyTable: {},


        // 是否需要开启 cssSourceMap


        cssSourceMap: false


    }
};

