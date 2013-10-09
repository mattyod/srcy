'use strict';

var fs = require('fs'),
    path = require('path'),
    arrToObj = require('./arrayToObject'),
    getRegExp = require('./imgRegExp'),
    log = require('./log');

module.exports = function (config) {
    var refs = {},
        ignore,
        blacklist,
        whitelist;

    var init = function () {
        ignore = arrToObj(config.refs.ignore);

        if (config.refs.blacklist) {
            blacklist = arrToObj(config.refs.blacklist);
        }

        if (config.refs.whitelist) {
            whitelist = arrToObj(config.refs.whitelist);
        }
    };

    var replace = function (imgRef, params) {
        var replacements;

        if (config.refs.replace[imgRef]) {
            replacements = config.refs.replace[imgRef];
            delete config.refs.replace[imgRef];

            addMatches(replacements, params);
            return true;
        }
    };

    var wildcard = function (match, params) {
        config.refs.wildcards.forEach(function (wildcard) {
            var chunks,
                fullPath,
                wildMatches = [];

            if (match.match(wildcard)) {

                chunks = match.split(new RegExp(wildcard));

                fullPath = path.join(config.images.root, chunks[0]);
                if (fs.statSync(fullPath).isDirectory()) {
                    fs.readdirSync(fullPath).forEach(function (file) {
                        if (file.match(chunks[1] + '$')) {
                            wildMatches.push(path.join(chunks[0], file));
                        }
                    });
                }

                addMatches(wildMatches, params);
            }

        });
    };

    var addMatches = function (matches, params) {
        matches.forEach(function (match) {

            if (replace(match, params)) {
                return;
            }

            if (wildcard(match, params)) {
                return;
            }

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

            addMatches((line.match(getRegExp(config)) || []), params);
        });
    };

    var map = function (resource) {
        if (!blacklist[resource]) {
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

    init();

    if (whitelist) {
        whitelist.forEach(function (resource) {
            if (fs.existsSync(resource)) {
                map(resource);
            } else {
                log.warn(resource + ' in refs.whitelist does not exist');
            }
        });
    } else {
        map('./');
    }

    return refs;
};
