var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var config = require("./env.conf.js");

// 判断环境
exports.isEnv = function (env) {
    var envString = "" + env;
    return process.env.NODE_ENV === envString;
};

// 设置环境
exports.setEnv = function (env) {
    process.env.NODE_ENV = "" + env;
};

// 获取环境
exports.getEnv = function () {
    return process.env.NODE_ENV
};


exports.mergeObject = function (destination, source) {
    for (var property in source) {
        if ( source.hasOwnProperty(property) ) {
            destination[property] = source[property];   // 利用动态语言的特性, 通过赋值动态添加属性与方法
        }
    }
    // 去除引用
    var copy = JSON.stringify(destination);
    return JSON.parse(copy);   // 返回扩展后的对象
};

// 设置静态文件输出目录
exports.assetsPath = function (_path) {
    var assetsSubDirectory = exports.isEnv("production")
        ? config.dist.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path)
};

// 设置样式的Loaders
exports.cssLoaders = function (options) {
    options = options || {};

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: exports.isEnv("production"),
            sourceMap: options.sourceMap || false
        }
    };

    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader];
        if ( loader ) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        if ( options.extract ) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            });
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        less: generateLoaders('less'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
};

// 输出样式Loaders
exports.styleLoaders = function (options) {
    var output = [];
    var loaders = exports.cssLoaders(options);
    for (var name in loaders) {
        var loader = loaders[name];
        output.push({
            test: new RegExp('\\.' + name + '$'),
            use: loader
        })
    }
    return output
};

// 输出html的依赖处理(构造多个页面)
exports.htmlPlugins = function (options) {
    var plugins = [];

    function buildHtml(page) {
        return new HtmlWebpackPlugin({
            template: page.template + ".html",  // 模板
            filename: "" + page.output,         // 输出
            chunks: page.chunks,                // 依赖
            inject: true,                       // 插入位置
            hash: false,                        // 哈希
            minify: {
                removeComments: exports.isEnv("production"),
                collapseWhitespace: exports.isEnv("production"),
                removeAttributeQuotes: exports.isEnv("production"),
            },
        });
    }

    /**
     *  page:{
     *      template:"",
     *      output:"",
     *      chunks:[]
     *  }
     */
    for (var i = 0; i < options.pages.length; i ++) {
        var page = options.pages[i];
        if ( options.common ) {
            page.chunks.push('vendor');
        }
        var htmlPluginsCommon = buildHtml(page);
        plugins.push(htmlPluginsCommon);
    }

    return plugins
};

exports.commonPlugins = function (options) {
    var _chunks = [];
    for (var name in options.entry) {
        _chunks.push(name);
    }

    var vendorChunk = new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    });

    var commonChunk = new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: _chunks.length
    });

    var plugins = [];
    if ( options.common ) {
        plugins = [vendorChunk, commonChunk];
    }

    return plugins
};

exports.envPlugin = function () {
    return new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)});
};