'use strict';

var config = require('../config.js'),
    fs = require('fs'),
    sep = require('path').sep;

module.exports = function () {
    console.log(process.env.PWD);
    var refs = {};
    var map = function (path, obj) {
        fs.readdirSync(path).forEach(function (subPath) {
            console.log(subPath);
            //obj = obj[path] = {};
            if (!subPath.match(/\./)) {
                if (fs.statSync(subPath).isDirectory()) {
                    obj[subPath] = {};
                    map(path + sep + subPath, obj[subPath]);
                }
            }
        });
    };

    return map('./', refs['./']);

};
