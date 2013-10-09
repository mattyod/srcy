'use strict';

var log = require('./log'),
    itterate = require('./itterate');

module.exports = function (imgs, refs) {
    var logRefs = function (ref) {
        refs[ref].forEach(function (details) {
            log.info(ref + ': ' + details.file + ' (line: ' + details.line + ')');
        });
    };

    itterate(imgs, function (val, img) {
        log.warn('image never referenced - ' + img);
    });

    itterate(refs, function (val, ref) {
        log.error('image referenced but not found');
        logRefs(ref);
    });
};
