var log = require('./log');

module.exports = function (imgs, refs) {
    var img, ref;

    for (img in imgs) {
        if (imgs.hasOwnProperty(img)) {
            log.warn('image never referenced - ' + img);
        }
    }

    for (ref in refs) {
        if (refs.hasOwnProperty(ref)) {
            log.error('image referenced but not found');
            refs[ref].forEach(function (details) {
                log.info(ref + ': ' + details.file + ' (line: ' + details.line + ')');
            });
        }
    }
};
