var webpack = require('webpack');
var merge = require('webpack-merge');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var utils = require('./utils');
var config = require("./env.conf.js");
utils.setEnv(config.dev.env);
var baseWebpackConfig = require('./webpack.base.conf');

// 添加自动刷新模块
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

var devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: config.dist.assetsRoot,
        publicPath: config.dev.assetsPublicPath,
        filename: utils.assetsPath(config.dev.jsFileName),
        chunkFilename: utils.assetsPath(config.dev.jsFileName)
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/',
        host: '0.0.0.0',
        port: config.dev.port,
        inline: true,
        hot: true,
        stats: {colors: true},
    }
});

module.exports = devWebpackConfig;