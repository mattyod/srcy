'use strict';

var config = require('../config.js'),
    fs = require('fs'),
    path = require('path'),
    checkSuffix = require('./checkSuffix.js'),
    arrToObj = require('./arrayToObject');

module.exports = function () {
    var map,
        files = {},
        ignore;

    ignore = arrToObj(config.images.ignore);

    map = function (resource) {
        if (fs.statSync(resource).isDirectory()) {
            fs.readdirSync(resource).forEach(function (subResource) {
                map(path.join(resource, subResource));
            });
        } else {
            if (checkSuffix(resource) && !ignore[resource]) {
                files[resource] = true;
            }
        }
    };

    if (config.images && config.images.roots) {
        config.images.roots.forEach(function (resource) {
            if (fs.existsSync(resource)) {
                map(resource);
            } else {
                console.log('imgCheck: ' + resource + ' does not exist');
                process.exit();
            }
        });
    } else {
        console.log('imgCheck: No image paths specified in config');
        process.exit();
    }

    return files;
};