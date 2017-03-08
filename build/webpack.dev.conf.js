process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var merge = require('webpack-merge');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var utils = require('./utils');
var config = require('../config');
var baseWebpackConfig = require('./webpack.base.conf');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

var devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
    ],
    //使用webpack-dev-server，提高开发效率
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/',
        host: '0.0.0.0',
        port: 8888,
        inline: true,
        hot: true,
        stats: { colors: true },
        lazy: true,
    },
});

module.exports = devWebpackConfig;