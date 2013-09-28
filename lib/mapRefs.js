'use strict';

var config = require('../config.js'),
    fs = require('fs'),
    sep = require('path').sep;

module.exports = function () {
    var refs = { './': {} };
    var map = function (path, obj) {
        obj = obj[path] = {};
        fs.readdirSync(path).forEach(function (subPath) {
            if (!subPath.match(/^\./)) {
                path = path.match(/\/$/) ? path : path + sep;
                subPath = path + subPath;
                if (fs.statSync(subPath).isDirectory()) {
                    obj[subPath] = {};
                    map(subPath, obj);
                } else {
                    obj[subPath] = true;
                }
            }
        });
    };

    map('./', refs);

    return refs;
};
