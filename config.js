'use strict';

module.exports = {
    refs: {
        whitelist: false,
        blacklist: {
            'npm_modules': true,
            'hooks': true,
            'puppet': true,
            //'test': true,
            'public/img': true,
            'LICENSE': true,
            'README.md': true,
            'lib': true,
            'imgCheck.js': true,
            'config.js': true
        }
    },
    images: {
        roots: ['./public'],
        folder: 'img',
        types: ['gif', 'png', 'jpg', 'svg', 'ico']

    }
};
