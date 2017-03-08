process.env.NODE_ENV = 'production';
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var config = require('../config');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.conf');


var env = utils.isEnv("testing")
    ? require('../config/test.env')
    : config.dist.env;

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dist.productionSourceMap,
            extract: true
        })
    },
    devtool: false,
    output: {
        path: config.dist.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new OptimizeCSSPlugin(),
        new ExtractTextPlugin({
                filename:utils.assetsPath('style/[name].css?[contenthash:8]'), //css的打包地址,添加hash
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
