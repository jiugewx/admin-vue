/**
 * Created by xinye on 2016/12/3.
 */
var base  = require("./karma.conf.js");

module.exports = function (karmaConfig) {
    karmaConfig.set(base.browsers);
};