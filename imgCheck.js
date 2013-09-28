'use strict';

var config = require('./config.js'),
    mapImages = require('./lib/mapImages'),
    mapRefs = require('./lib/mapRefs');

module.exports = (function () {
    var images = mapImages();
    var refs = mapRefs();
    return true;
})();
