'use strict';

var mapResources = require('./lib/mapResources'),
    mapRefs = require('./lib/mapRefs'),
    check = require('./lib/check'),
    config = require('./lib/getConf').fetch();

module.exports = (function () {
    process.exit(check(mapResources(config), mapRefs.init(config)));
})();
