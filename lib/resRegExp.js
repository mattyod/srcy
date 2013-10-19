'use strict';

module.exports = function (config) {
    var suffixes = config.resources.types.join('|'),
        folders = config.resources.folders.join('|');

    return new RegExp('\\b(' + folders + ')\/(?:(?!\\s).)*\\.(' + suffixes + ')(?![a-zA-Z0-9_-])', 'gm');
};
