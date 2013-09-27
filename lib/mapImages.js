'use strict';

var config = require('../config.js'),
    fs = require('fs'),
    sep = require('path').sep;

module.exports = function () {
    var files = {};

    var map = function (path, obj) {
        if (fs.statSync(path).isDirectory()) {
            obj[path] = {};

            fs.readdirSync(path).forEach(function (subPath) {
                map(path + sep + subPath, obj[path]);
            });
        } else {
            obj[path] = true;
        }
    };

    config.imagePaths.forEach(function (path) {
        if (fs.existsSync(path)) {
            map(path, files);
        }
    });

    return files;
};
