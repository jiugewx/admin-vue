
var path = require('path');
var startOptions = require("./start");
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');

console.log("\033[32m 当前 NODE_ENV : \033[0m" + process.env.NODE_ENV);

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var plugins = [utils.envPlugin()];
plugins = plugins.concat(utils.htmlPlugins(startOptions.pages, startOptions.common));
plugins = plugins.concat(utils.commonPlugins(startOptions));

module.exports = {
    entry: startOptions.entry,
    output: startOptions.output,
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:8].[ext]?[hash:8]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[sha512:hash:base64:8].[ext]?[hash:8]')
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            },
        ]
    },
    plugins:plugins
};
