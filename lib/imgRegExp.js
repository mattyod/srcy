'use strict';
var config = require('../config.js');

module.exports = (function () {
    var suffixes = config.images.types.join('|');

    return new RegExp(config.images.folder + '\/.*?.(' + suffixes + ')', 'g');
})();