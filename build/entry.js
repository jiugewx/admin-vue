/**
 * Created by wangxin on 2017/3/8.
 */
var admin = require("../admin/webpack.project.config.js");
var config = require("./env.conf.js");
var utils = require("./utils");

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
    common: true,
};

module.exports = options;