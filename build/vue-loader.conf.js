var utils = require('./utils');
var config = require('../config');
var isProduction = utils.isEnv('production');

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.dist.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
};
