'use strict';

var log = require('./log'),
    itterate = require('./itterate');

module.exports = {
    show: function (resources, refs) {
        var logRefs = function (ref) {
            refs[ref].forEach(function (details) {
                log.info(ref + ': ' + details.file + ' (line: ' + details.line + ')');
            });
        };

        itterate(resources, function (val, res) {
            log.warn('resource never referenced - ' + res);
        });

        itterate(refs, function (val, ref) {
            log.error('resource referenced but not found');
            logRefs(ref);
        });
    }
};
