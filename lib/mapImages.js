'use strict';

var fs = require('fs'),
    path = require('path'),
    arrToObj = require('./arrayToObject'),
    checkSuffix = require('./checkSuffix.js'),
    log = require('./log');

module.exports = function (config) {
    var map,
        files = {},
        root = config.images.root,
        ignore = arrToObj(config.images.ignore),
        types =  arrToObj(config.images.types);

    map = function (resource) {
        var fullPath = path.join(root, resource);

        if (fs.statSync(fullPath).isDirectory()) {
            fs.readdirSync(fullPath).forEach(function (subResource) {
                if (!subResource.match(/^\./)) {
                    map(path.join(resource, subResource));
                }
            });
        } else {
            if (checkSuffix(resource, types) && !ignore[resource]) {
                files[resource] = true;
            }
        }
    };

    config.images.folders.forEach(function (resource) {
        if (fs.existsSync(path.join(root, resource))) {
            map(resource);
        } else {
            log.error(path.join(root, resource) + ' does not exist');
        }
    });

    return files;
};
