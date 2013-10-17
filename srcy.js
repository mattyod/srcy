'use strict';

var mapImages = require('./lib/mapImages'),
    mapRefs = require('./lib/mapRefs'),
    check = require('./lib/check'),
    config = require('./lib/getConf').fetch();

module.exports = (function () {
    process.exit(check(mapImages(config), mapRefs.init(config)));
})();
