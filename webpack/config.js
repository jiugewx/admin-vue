// 检查 Node 和 npm 版本

require('./check-versions')();

// 获取 config/index.js 的默认配置

var config = require('../config');

// 如果Node 的环境无法判断当前是dev/product 环境

// 使用 config.dev.env.NODE_ENV 作为当前的环境

if ( ! process.env.NODE_ENV )process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

// 使用nodeJS 自带的路径工具

var path = require('path');

// 使用 express

var express = require('express');

//  使用webpack

var webpack = require('webpack');

// 一个可以强制打卡浏览器并挑战到指定url 的插件

var opn = require('opn');

// 使用proxyTable

var proxyMiddleware = require('http-proxy-middleware');

// 使用 dev 环境的webpack 配置

var webpackConfig = require('./webpack.dev.conf');

// 如果没有指定运行端口，使用config.dev.port 作为运行端口

var port = process.env.PORT || config.dev.port;

// 使用config.dev.proxyTable 的配置作为proxyTable 的代理配置

var proxyTable = config.dev.proxyTable;

// 使用 express 启动一个服务

var app = express();

// 启动webpack 进行编译

var compiler = webpack(webpackConfig);

// 启动 webpack-dev-middleware, 将 编译后的文件暂存到内存中

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true, chunks: false}
});

// 启动 webpack-hot-middleware, 也就是我们常说的Hot-reload

var hotMiddleware = require('webpack-hot-middleware')(compiler);
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'});
        cb()
    })
});

// 将proxyTable 中的请求配置挂在启动的express 服务上

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if ( typeof options === 'string' ) {
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
});

// 使用 connect-hisory-api-fallback 匹配资源，如果不匹配就可以重 定向到指定地址

app.use(require('connect-history-api-fallback')());

// 将暂存到内存中的 wepack 编译后的文件挂载带express 服务上

app.use(devMiddleware);

// 将Hot-reload 挂载到 express 服务上

app.use(hotMiddleware);

//拼接到 static 文件夹的静态资源路径

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 为静态资源提供相应服务

app.use(staticPath, express.static('./static'));

// 让我们这个express 服务监听port 的请求，并且将此服务作为 dev-server.js的接口暴露

module.exports = app.listen(port, function (err) {
    if ( err ) {
        console.log(err);
        return
    }
    var uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');

    // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址

    if ( process.env.NODE_ENV !== 'testing' ) {
        opn(uri)
    }
});










