'use strict';

module.exports = function (imgs, refs) {
    var img, ref;

    for (img in imgs) {
        if (imgs.hasOwnProperty(img)) {
            console.log('WARN: image never referenced -', img);
        }
    }

    for (ref in refs) {
        if (refs.hasOwnProperty(ref)) {
            console.log('ERROR image referenced but not found');
            refs[ref].forEach(function (details) {
                console.log('    ' + details.file + ':', ref, '(line: ' + details.line + ')');
            });
        }
    }
};