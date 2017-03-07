// 使用 nodejs 自带的文件路径


var path = require('path');


// 加载 confi.index.js


var config = require('../config');


// 使用一些工具


var utils = require('./utils');


// 加载 webpack


var webpack = require('webpack');


// 加载webpack 配置合并工具


var merge = require('webpack-merge');


// 加载 webpack.base.conf.js


var baseWebpackConfig = require('./webpack.base.conf');


// 一个webpack 扩展，可以提取一些代码并且将他们和文件分离开


// 如果我们想将webpack 打包成一个文件 css js 分离开，那我们需要这个插件


var ExtractTextPlugin = require('extract-text-webpack-plugin');


//一个可以插入 html 并且创建新的 .html 文件的插件


var HtmlWebpackPlugin = require('html-webpack-plugin');


var env = config.build.env;


// 合并 webpack.base.conf.js


var webpackConfig = merge(baseWebpackConfig, {


    module: {


        // 使用 loader


        loaders: utils.styleLoaders({


            sourceMap: config.build.productionSourceMap, extract: true
        })


    },


    // 是否使用 #source-map 开发工具


    devtool: config.build.productionSourceMap ? '#source-map' : false, output: {


        // 编译输出项目


        path: config.build.assetsRoot,


        // 编译输出文件名


        // 我们可以在hash 后加 :6 决定使用几位 hash 值


        filename: utils.assetsPath('js/[name].[chunkhash].js'),


        // 没有指定输出名的文件输出的文件名


        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },


    vue: {


        //  编译 .vue 文件的使用的loader


        loaders: utils.cssLoaders({


            sourceMap: config.build.productionSourceMap, extract: true
        })
    }, plugins: [


        // 使用的插件  definePlugin 接收字符串插入到代码当中，所以你需要的话写上


        new webpack.DefinePlugin({'process.env': env}),


        // 压缩js (同样可以压缩css)


        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),


        new webpack.optimize.OccurrenceOrderPlugin(),


        // 将css 文件分离出来


        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),


        // 输入 输出的 .html 文件


        new HtmlWebpackPlugin({
            filename: config.build.index, template: 'index.html',


            // 是否注入 html


            inject: true,


            // 压缩的方式


            minify: {


                removeComments: true,


                collapseWhitespace: true,


                removeAttributeQuotes: true
            },


            chunksSortMode: 'dependency'
        }),


        // 没有指定输出文件名的文件输出的静态文件名


        new webpack.optimize.CommonsChunkPlugin({


            name: 'vendor',


            minChunks: function (module, count) {


                return (



                module.resource && /\.js$/.test(module.resource) &&


                module.resource.indexOf(
                    path.join(__dirname, '../node_modules')
                ) === 0 )
            }


        }),


        // 没有指定输出文件名称的文件输出的静态文静名


        new webpack.optimize.CommonsChunkPlugin({


            name: 'manifest',


            chunks: ['vendor']
        })


    ]


});


// 开启 gzip 的情况下使用下方的配置


if ( config.build.productionGzip ) {



    // 加载 compression-webpack-plugin 插件


    var CompressionWebpackPlugin = require('compression-webpack-plugin')


    // 向webpackconfig.plugins中加入下方的插件


    var reProductionGzipExtensions = '\\.(' + config.build.productionGzipExtensions.join('|') + '$)'


    webpackConfig.plugins.push(
        // 使用 compression-webpack-plugin 插件进行压缩


        new CompressionWebpackPlugin({


            asset: '[path].gz[query]',


            algorithm: 'gzip',


            test: new RegExp(reProductionGzipExtensions),


            // 注：此处因有代码格式化的bug，与源码有差异


            threshold: 10240, minRatio: 0.8
        })
    )
}


module.exports = webpackConfig;