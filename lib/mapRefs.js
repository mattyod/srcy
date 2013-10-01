'use strict';

var config = require('../config.js'),
    fs = require('fs'),
    path = require('path');

module.exports = function () {
    var map,
        scan,
        refs = {};

    scan = function (resource) {
        var suffixes = config.images.types.join('|'),
            matcher;

        matcher = new RegExp(config.images.folder + '\/.*?.(' + suffixes + ')', 'g');

        fs.readFileSync(resource, 'utf8').split(/\r?\n/).forEach(function (line, index) {
            var matches = line.match(matcher);

            if (matches) {
                matches.forEach(function (match) {
                    if (!refs[match]) {
                        refs[match] = [];
                    }

                    refs[match].push({
                        file: resource,
                        line: (index + 1)
                    });
                });
            }
        });
    };

    map = function (resource) {
        if (!config.refs.blacklist[resource]) {
            if (fs.statSync(resource).isDirectory()) {
                fs.readdirSync(resource).forEach(function (subResource) {
                    if (!subResource.match(/^\./)) {
                        map(path.join(resource, subResource));
                    }
                });
            } else {
                scan(resource);
            }
        }
    };

    if (config.refs.whitelist) {
        config.refs.whitelist.forEach(function (resource) {
            if (fs.existsSync(resource)) {
                map(resource);
            } else {
                console.log('imgCheck: ', resource, 'in refs.whitelist does not exist');
            }
        });
    } else {
        map('./');
    }

    return refs;
};
