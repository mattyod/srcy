'use strict';
var feedback = require('./feedback.js');

module.exports = function (imgs, refs) {
    var matched = {},
        ref;

    for (ref in refs) {
        if (refs.hasOwnProperty(ref)) {
            if (imgs[ref]) {
                matched[ref] = true;
                delete imgs[ref];
            }

            if (matched[ref]) {
                delete refs[ref];
            }
        }
    }

    return feedback(imgs, refs)
    // console.log('imgs', imgs);
    // console.log('refs: ', refs);
};
