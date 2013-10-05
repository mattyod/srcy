'use strict';

var config = require('../config.js'),
    fs = require('fs'),
    path = require('path'),
    arrToObj = require('./arrayToObject'),
    matcher = require('./imgRegExp');

var ignore = arrToObj(config.images.ignore),
    blacklist,
    whitelist;

module.exports = function () {
    var refs = {};

    var addMatches = function (matches, params) {
        matches.forEach(function (match) {
            if (!ignore[match]) {
                if (!refs[match]) {
                    refs[match] = [];
                }

                refs[match].push(params);
            }
        });
    };

    var scan = function (resource) {
        fs.readFileSync(resource, 'utf8').split(/\r?\n/).forEach(function (line, index) {
            var params = {
                file: resource,
                line: (index + 1)
            };

            addMatches((line.match(matcher) || []), params);
        });
    };

    var map = function (resource) {
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
