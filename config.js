'use strict';

module.exports = {
    refs: {
        whitelist: false,
        blacklist: [
            'npm_modules',
            'hooks',
            'puppet',
            'public/img',
            'LICENSE',
            'README.md',
            'lib',
            'imgCheck.js',
            'config.js',
            'public/js/lib'],
        replace: {},
        ignore: [],
        wildcards: ['#{.*?}']
    },
    images: {
        root: './public',
        folders: ['img'],
        types: ['gif', 'png', 'jpg', 'svg', 'ico'],
        ignore: ['img/notToBeReferenced.gif']
    }
};
