process.env.NODE_ENV = 'testing';

var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config.js').base;
var webpack = require('webpack');
var projectRoot = path.resolve(__dirname, '../');//项目的根目录

var webpackConfig = merge(baseConfig, {
    devtool: '#inline-source-map',
    vue: {
        loaders: {
            js: 'isparta'
        }
    }
});

delete webpackConfig.entry;

var KarmaBaseConfig = {
    basePath: projectRoot,
    plugins: [
        // 'karma',
        // 'mocha',
        // "chai",
        // "sinon",
        // "sinon-chai",
        // "function-bind",
        // "isparta-loader",
        "karma-coverage",
        "karma-mocha",
        'karma-firefox-launcher',
        'karma-safari-launcher',
        "karma-chrome-launcher",
        "karma-phantomjs-launcher",
        "karma-sourcemap-loader",
        "karma-sinon-chai",     //需要chai,sinon,sinon-chai的包支持
        "karma-spec-reporter",  // spec的测试报告
        "karma-webpack"
    ],
    // 测试采用的技术框架
    frameworks: ['mocha', 'sinon-chai'],
    // 测试文件(entry)
    files: ['./test/unit/index.js'],

    // 预先加载的
    preprocessors: {
        './test/unit/index.js': ['webpack', 'sourcemap']
    },
    // webpack的配置
    webpack: webpackConfig,

    // webpack中间件
    webpackMiddleware: {
        noInfo: true
    },
    // 异步超时设置60秒
    captureTimeout: 60000,
    browserNoActivityTimeout: 20000,
    // 自动监听文件变化
    autoWatch: true
};

// 单浏览器测试（虚拟浏览器）
var unitConfig = Object.assign({}, KarmaBaseConfig, {
    //测试浏览器
    browsers: ['Chrome'],
    // 单程
    singleRun: false,
    // 报告
    reporters: ['spec']
});


var coverWebpackConfig = Object.assign({}, webpackConfig);
coverWebpackConfig.module.postLoaders = [
    {
        test: /\.js$/,
        exclude: [/node_modules/, /karma/, /\.Spec.js$/],
        include: [/test-example/],
        loader: 'isparta!istanbul-instrumenter'
    }
];

// 覆盖率测试
var coverConfig = Object.assign({}, KarmaBaseConfig, {
    //测试浏览器
    browsers: ['PhantomJS'],
    // 单程
    singleRun: true,
    preprocessors: {
        './test/unit/index.js': ['webpack', 'sourcemap']
    },
    webpack: coverWebpackConfig,
    // 报告
    reporters: ['spec', 'coverage'],
    // 覆盖率的报告
    coverageReporter: {
        dir: './test/unit/coverage',
        reporters: [
            {type: 'lcov', subdir: '.'},
            {type: 'text-summary'}
        ]
    },
    clear(){
        var fileTool = require("./node.fileTools.js");
        fileTool.clear(['./test/unit/coverage'])
    }
});

// 多浏览器测试
var browsersConfig = Object.assign({}, KarmaBaseConfig, {
    //测试浏览器
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
    // 单程
    singleRun: true,
    // 报告
    reporters: ['progress']
});


module.exports = {
    unit: unitConfig,
    cover: coverConfig,
    browsers: browsersConfig
};
