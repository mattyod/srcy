'use strict';

var config = require('../config.js'),
    fs = require('fs'),
    path = require('path'),
    arrToObj = require('./arrayToObject'),
    checkSuffix = require('./checkSuffix.js'),
    log = require('./log');

var ignore = arrToObj(config.images.ignore);

module.exports = function () {
    var map,
        replacements,
        files = {},
        root = config.images.root;

    map = function (resource) {
        var fullPath = path.join(root, resource);

        if (fs.statSync(fullPath).isDirectory()) {
            fs.readdirSync(fullPath).forEach(function (subResource) {
                if (!subResource.match(/^\./)) {
                    map(path.join(resource, subResource));
                }
            });
        } else {
            if (checkSuffix(resource) && !ignore[resource]) {
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
