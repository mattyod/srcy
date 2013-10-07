'use strict';
var config = require('../config.js');

module.exports = (function () {
    var suffixes = config.images.types.join('|'),
        folders = config.images.folders.join('|');

    return new RegExp('\\b(' + folders + ')\/(?:(?!\\s).)*\\.(' + suffixes + ')', 'g');
})();
