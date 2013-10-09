'use strict';

var log = require('./log');

module.exports = function (imgs, refs) {
    var img, ref;

    var logRefs = function (ref) {
        refs[ref].forEach(function (details) {
            log.info(ref + ': ' + details.file + ' (line: ' + details.line + ')');
        });
    };

    for (img in imgs) {
        if (imgs.hasOwnProperty(img)) {
            log.warn('image never referenced - ' + img);
        }
    }

    for (ref in refs) {
        if (refs.hasOwnProperty(ref)) {
            log.error('image referenced but not found');
            logRefs(ref);
        }
    }
};
