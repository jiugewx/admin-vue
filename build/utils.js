var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var config = require('../config');

// 是否为生产环境
exports.isEnv = function (env) {
    var envString = "" + env;
    return process.env.NODE_ENV === envString;
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
exports.htmlPlugins = function (pages, commonConfig) {
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
    for (var i = 0; i < pages.length; i ++) {
        var page = pages[i];
        if ( commonConfig.common && ("" + page.chunks).indexOf("/") != - 1 ) {
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
        if ( name.indexOf('/') != - 1 ) {
            _chunks.push(name);
        }
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