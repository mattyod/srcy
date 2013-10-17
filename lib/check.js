'use strict';
var feedback = require('./feedback'),
    itterate = require('./itterate');

module.exports = function (imgs, refs) {
    var matched = {};

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

    return (Object.keys(refs).length);

};
