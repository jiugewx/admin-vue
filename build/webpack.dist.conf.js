var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var config = require("./env.conf.js");
var utils = require('./utils');
utils.setEnv(config.dist.env);
var baseWebpackConfig = require('./webpack.base.conf');
var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dist.productionSourceMap,
            extract: true
        })
    },
    devtool: false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new OptimizeCSSPlugin(),
        new ExtractTextPlugin({
            filename: utils.assetsPath(config.dist.cssFileName), //css的打包地址,添加hash
            allChunks: true,
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../libs'),
                to: config.dist.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
});


if ( config.dist.productionGzip ) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.dist.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if ( config.dist.bundleAnalyzerReport ) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
