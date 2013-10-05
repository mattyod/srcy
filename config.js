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
            'config.js': true,
            'public/js/lib': true
        }
    },
    images: {
        roots: ['./public'],
        root: './public',
        folder: 'img',
        folders: ['img'],
        types: ['gif', 'png', 'jpg', 'svg', 'ico'],
        ignore: ['img/weather/#{temperature.outside.weather.now}_small.png'],
        replace: []
    }
};
