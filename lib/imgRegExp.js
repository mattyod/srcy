'use strict';

module.exports = function (config) {
    var suffixes = config.images.types.join('|'),
        folders = config.images.folders.join('|');

    return new RegExp('\\b(' + folders + ')\/(?:(?!\\s).)*\\.(' + suffixes + ')(?![a-zA-Z0-9_-])', 'gm');
};
