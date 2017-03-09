var utils = require('./utils');
var config = require("./env.conf.js");
var isProduction = utils.isEnv('production');

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.dist.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
};
