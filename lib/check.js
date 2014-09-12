'use strict';
var feedback = require('./feedback'),
    itterate = require('./itterate'),
    log = require('col');

module.exports = function (resources, refs) {
    var matched = {},
        errors;

    itterate(refs, function (val, ref) {
        if (resources[ref]) {
            matched[ref] = true;
            delete resources[ref];
        }

        if (matched[ref]) {
            delete refs[ref];
        }
    });

    feedback.show(resources, refs);

    errors = Object.keys(refs).length;

    if (!errors && !Object.keys(resources).length) {
        log.success('no issues found');
    }

    return (errors);

};
