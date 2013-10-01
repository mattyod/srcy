'use strict';

var config = require('./config.js'),
    mapImages = require('./lib/mapImages'),
    mapRefs = require('./lib/mapRefs'),
    check = require('./lib/check');

module.exports = (function () {
    return check(mapImages(), mapRefs());
})();
