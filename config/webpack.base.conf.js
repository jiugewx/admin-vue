require('./check-versions')();
var path = require('path');
var chalk = require('chalk');
var entryOptions = require("./entry");
var utils = require('./utils');
var config = require("./env.conf.js");
var vueLoaderConfig = require('./vue-loader.conf');

console.log(chalk.green("process.env.NODE_ENV : ") + chalk.yellow(process.env.NODE_ENV));


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var plugins = [utils.envPlugin()];
plugins = plugins.concat(utils.htmlPlugins(entryOptions));
plugins = plugins.concat(utils.commonPlugins(entryOptions));

module.exports = {
    entry: entryOptions.entry,
    output: {
        path: config.dist.assetsRoot,
        publicPath: config.dist.assetsPublicPath,
        filename: utils.assetsPath(config.dist.jsFileName) ,
        chunkFilename: utils.assetsPath(config.dist.jsFileName)
    },
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
                    name: utils.assetsPath(config.dist.imageFileName)
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath(config.dist.fontsFileName)
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            },
        ]
    },
    plugins: plugins
};
