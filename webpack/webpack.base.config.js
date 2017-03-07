var admin = require('../admin/webpack.project.config.js');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //提炼css
var HtmlWebpackPlugin = require('html-webpack-plugin'); //匹配HTML
var version = require('./pack.banner.js').version;

// 环境判断选择什么样的打包方式
console.log("\033[32m 当前 NODE_ENV => \033[0m" + process.env.NODE_ENV);

// 将项目中的一些变量给定义了
var nodeEnv = new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)});
var output = '../dist/';
var outPutHash = process.env.NODE_ENV == "development" ? "js/[name].js?[hash:8]" : "js/[name].js?[chunkhash:12]"; // hash是编译的指纹,chunkhash是模块的指纹
var publicPath = "/";

function pages() {
    var pages = [];
    pages = pages.concat(admin.pages);
    return pages
}

function entry() {
    var entries = {};

    for (var key1 in admin.entry) {
        entries[key1] = admin.entry[key1];
    }

    return entries
}

var options = {
    // 配置每个页面的来源与模块依赖
    pages: pages(),
    entry: entry(),
    common: {
        toggle: true,// 是否提炼common,一般用于多页面时使用
        commonName: "common"
    },
    output: {
        path: path.join(__dirname, output),
        publicPath: publicPath,
        filename: outPutHash,
        chunkFilename: outPutHash
    },
    imagesQuery: {
        limit: 10240,
        name: "images/[name].[hash:8].[ext]?[hash:8]",
        /*这里是css中图片的引用地址，并且也是相对于output.publish的存放地址,在css中的效果就是publish+name（因此要注意css的引用地址，及本身位置）*/
    },
    fontsQuery: {
        limit: 10240,
        name: "fonts/[name].[sha512:hash:base64:8].[ext]?[hash:8]",
    },
    ExtractTextPluginOptions: {
        publicPath: publicPath, //也可改成绝对地址,与output.publicPath一致
    },
    plugins: [
        new ExtractTextPlugin({
                id: 'WangXin'
            }, 'style/[name].css?[contenthash:8]', //css的打包地址,添加hash
            {
                allChunks: true,
                disabled: false
            })
    ],
    vue: {}
};

function getPlugins() { /*生成Common.js/common.css*/
    var _chunks = [];
    for (var name in options.entry) {
        if ( name.indexOf('/') != - 1 ) { // 如果入口文件中存在有"/"那就提取这些文件的common
            _chunks.push(name);
        }
    }

    var commonChunk = new webpack.optimize.CommonsChunkPlugin({
        name: options.common.commonName,
        chunks: _chunks,
        minChunks: _chunks.length
    });

    if ( options.common.toggle ) {
        options.plugins = options.plugins.concat(commonChunk);
    }
}

function buildHtml() {
    for (var i = 0; i < options.pages.length; i ++) {
        var page = options.pages[i];
        if ( options.common.toggle ) {
            // 针对需要common js的require才添加上common.js
            if((""+page.required).indexOf("/") != -1){
                page.required.push(options.common.commonName);
            }
            var htmlPluginsCommon = new HtmlWebpackPlugin({
                /*favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值*/
                template: page.from + ".html",
                /*html来源*/
                filename: "" + page.to + "?" + version,
                /*生成的html存放路径，相对于path*/
                chunks: page.required,
                /*需要引入的chunk，不配置就会引入所有页面的资源*/
                inject: 'body',
                /*js插入的位置，true/'head'/'body'/false*/
                hash: false,
                /*为chunk资源生成hash值,用的是chunk自身的hash,false时,启用的是chunk自身的hash*/
                minify: {
                    /*压缩HTML文件*/
                    removeComments: false,
                    /*移除HTML中的注释*/
                    collapseWhitespace: false
                    /*删除空白符与换行符*/
                }
            });
            options.plugins.push(htmlPluginsCommon);
        } else {
            var htmlPlugins = new HtmlWebpackPlugin({
                /*favicon: './src/img/favicon.ico',*/
                template: page.from + ".html",
                filename: "" + page.to + "?" + version,
                chunks: page.required,
                inject: 'body',
                hash: false,
                minify: {
                    removeComments: false,
                    collapseWhitespace: false
                }
            });
            options.plugins.push(htmlPlugins);
        }
    }
}

function appendVue() {
    /*抽离vue文件中的js/css代码*/
    options['vue'] = {
        loaders: {
            js: 'babel?{"presets":["es2015"]}',
            css: ExtractTextPlugin.extract('css-loader?sourceMap', options.ExtractTextPluginOptions),
            less: ExtractTextPlugin.extract('css-loader?sourceMap!less-loader?sourceMap', options.ExtractTextPluginOptions),
            stylus: ExtractTextPlugin.extract('css-loader?sourceMap!stylus-loader?sourceMap', options.ExtractTextPluginOptions),
            styl: ExtractTextPlugin.extract('css-loader?sourceMap!stylus-loader?sourceMap', options.ExtractTextPluginOptions)
        }
    };
}

function init() {
    getPlugins();
    buildHtml();
    appendVue();
}

init();


var BaseConfig = {
    entry: options.entry,
    output: options.output,
    plugins: options.plugins,
    vue: options.vue,
    module: {
        /*语法检查*/
        // preLoaders: [
        // {test: /\.vue$/, loader: 'eslint', exclude: /node_modules/},
        // {test: /\.js$/, loader: 'eslint', exclude: /node_modules/}],

        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: path.resolve(__dirname, '../'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            /*配置css的抽取器、加载器。'-loader'可以省去*/
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader', options.ExtractTextPluginOptions)
        }, {
            test: /\.less$/,
            /*配置less的抽取器、加载器。根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入*/
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader', options.ExtractTextPluginOptions)
        }, {
            /*html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源 */
            test: /\.html$/,
            /* loader: "html?attrs=img:src img:data-src"/*这样会压缩html中的图片*/
            loader: 'vue-html-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader',
            // loader: 'url-loader? limit=10240 & name=images/projectName/[name].[ext]?[hash:8]',
            query: options.imagesQuery
        }, {
            /*文件加载器，处理文件静态资源*/
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            query: options.fontsQuery
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    babel: {
        presets: ['es2015']
    },
    resolve: {
        root: [
            path.resolve(__dirname),
            path.resolve(__dirname, './dist/js')
        ],
        extensions: ['', '.jsx', '.js', '.css', '.png', '.jpg', '.vue'],
        modulesDirectories: ['shared', 'node_modules'],
        alias: {
            'base': path.resolve(__dirname, './base'),
            'views': path.resolve(__dirname, './views'),
            'components': path.resolve(__dirname, './base/vue-components'),
        }
    },
    externals: [{
        "BMap": "BMap", //百度地图
        // "UE": "UE",                    //UEDITOR
        // 'jquery': "$",
        /*不打包的库，html中使用CDN*/
        // 'jquery': "jQuery"
        // 'react-dom': 'ReactDOM',
        // 'react': 'React'
    }]
};
var distConfigs = {
    devtool: false,
    plugins: [
        nodeEnv,
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }) /*压缩时不要打印警告*/
    ].concat(BaseConfig.plugins),
    vue: BaseConfig.vue,
    entry: BaseConfig.entry,
    output: BaseConfig.output,
    module: BaseConfig.module,
    resolve: BaseConfig.resolve,
    externals: BaseConfig.externals,
    babel: BaseConfig.babel
};


function buildDocuments() {
    var distFile = './dist';

    var fileTool = require("./node.fileTools.js");
    // 新建dist目录
    var createArray = [distFile];
    //复制目录
    var copyArray = [{
        from: './base/libs',
        to: distFile + '/libs'
    }, {
        from: './base/fonts',
        to: distFile + '/fonts'
    }];

    // 清除目录
    var cleanArray = [distFile];

    fileTool.clear(cleanArray);
    fileTool.create(createArray);
    fileTool.copy(copyArray);
}

var config = {
    base: BaseConfig,
    dist: distConfigs,
    file: buildDocuments
};

module.exports = config;
