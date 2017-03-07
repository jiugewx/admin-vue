/*设置环境变量--生产环境(这个定义位置只能放在这里)*/
process.env.NODE_ENV = 'production';

var config = require("./webpack.base.config.js");

module.exports = config.dist;
