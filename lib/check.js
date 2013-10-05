'use strict';

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
    // console.log('imgs', imgs);
    // console.log('refs: ', refs);
};