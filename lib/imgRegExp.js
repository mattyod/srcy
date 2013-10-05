'use strict';
var config = require('../config.js');

module.exports = (function () {
    var suffixes = config.images.types.join('|');

    return new RegExp('\\b' + config.images.folder + '\/(?:(?!\\s).)*\\.(' + suffixes + ')', 'g');
})();