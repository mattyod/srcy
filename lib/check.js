'use strict';
var feedback = require('./feedback'),
    itterate = require('./itterate'),
    log = require('./log');

module.exports = function (imgs, refs) {
    var matched = {},
        errors;

    itterate(refs, function (val, ref) {
        if (imgs[ref]) {
            matched[ref] = true;
            delete imgs[ref];
        }

        if (matched[ref]) {
            delete refs[ref];
        }
    });

    feedback.show(imgs, refs);

    errors = Object.keys(refs).length;

    if (!errors && !Object.keys(imgs).length) {
        log.success('no issues found');
    }

    return (errors);

};
