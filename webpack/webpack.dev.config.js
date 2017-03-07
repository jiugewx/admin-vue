/*设置环境变量--开发环境(这个定义位置只能放在这里)*/
process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var config = require("./webpack.base.config.js");
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //提炼css
var BaseConfig = config.base;

var developConfig = {
    // vue: {
    //     loaders:{
    //         scss: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap', {publicPath: '../'}),
    //         stylus: ExtractTextPlugin.extract('css-loader?sourceMap!stylus-loader?sourceMap', {publicPath: '../'}),
    //         styl: ExtractTextPlugin.extract('css-loader?sourceMap!stylus-loader?sourceMap', {publicPath: '../'})
    //     }
    // },
    devtool: "#eval-source-map",
    plugins: [
        /*加上热替换的插件和防止报错的插件以下都会写进js */
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ].concat(BaseConfig.plugins),
    //使用webpack-dev-server，提高开发效率
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/',
        /*所有的资源文件都要放在dist下面*/
        host: '127.0.0.1',
        port: 8888,
        inline: true,
        devtool: eval,
        progress: true,
        colors: true,
        hot: true,
        profile: true
    },
    vue: {
        loaders: {
            scss: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap', {
                publicPath: '../'
            }),
            stylus: ExtractTextPlugin.extract('css-loader?sourceMap!stylus-loader?sourceMap', {
                publicPath: '../'
            }),
            styl: ExtractTextPlugin.extract('css-loader?sourceMap!stylus-loader?sourceMap', {
                publicPath: '../'
            })
        }
    },
    module: BaseConfig.module,
    entry: BaseConfig.entry,
    output: BaseConfig.output,
    resolve: BaseConfig.resolve,
    externals: BaseConfig.externals,
    babel: BaseConfig.babel
};

module.exports = developConfig;
