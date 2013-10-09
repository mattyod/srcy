'use strict';

var mapImages = require('./lib/mapImages'),
    mapRefs = require('./lib/mapRefs'),
    check = require('./lib/check'),
    config = require('./lib/getConf').fetch();

module.exports = (function () {
    return check(mapImages(config), mapRefs(config));
})();
