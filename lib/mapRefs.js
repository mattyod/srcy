'use strict';

var fs = require('fs'),
    path = require('path'),
    getRegExp = require('./resRegExp'),
    checkSuffix = require('./checkSuffix.js'),
    log = require('./log');

module.exports = {

    refs: {},

    config: {},

    init: function (config) {
        this.config = config;
        this.regex = getRegExp(config);

        if (config.refs.whitelist) {
            config.refs.whitelist.forEach(function (resource) {
                if (fs.existsSync(resource)) {
                    this.map(resource);
                } else {
                    log.warn(resource + ' in refs.whitelist does not exist');
                }
            }.bind(this));
        } else {
            this.map('./');
        }

        return this.refs;
    },

    map: function (resource) {
        if (!this.config.refs.blacklist[resource] && !checkSuffix(resource, this.config.refs.notTypes)) {
            if (fs.statSync(resource).isDirectory()) {
                fs.readdirSync(resource).forEach(function (subResource) {
                    if (!subResource.match(/^\./)) {
                        this.map(path.join(resource, subResource));
                    }
                }.bind(this));
            } else {
                this.scan(resource);
            }
        }
    },

    scan: function (resource) {
        fs.readFileSync(resource, 'utf8').split(/\r?\n/).forEach(function (line, index) {
            var params = {
                file: resource,
                line: (index + 1)
            };

            this.addMatches((line.match(this.regex) || []), params);
        }.bind(this));
    },

    addMatches: function (matches, params) {
        matches.forEach(function (match) {

            if (this.replace(match, params)) {
                return;
            }

            if (this.wildcard(match, params)) {
                return;
            }

            if (!this.config.refs.ignore[match]) {
                if (!this.refs[match]) {
                    this.refs[match] = [];
                }

                this.refs[match].push(params);
            }
        }.bind(this));
    },

    wildcard: function (match, params) {
        var matched = false;

        this.config.refs.wildcards.forEach(function (wildcard) {
            var chunks,
                fullPath,
                wildMatches = [];

            if (match.match(wildcard)) {

                chunks = match.split(new RegExp(wildcard));

                fullPath = path.join(this.config.resources.root, chunks[0]);
                if (fs.statSync(fullPath).isDirectory()) {
                    fs.readdirSync(fullPath).forEach(function (file) {
                        if (file.match(chunks[1] + '$')) {
                            wildMatches.push(path.join(chunks[0], file));
                        }
                    });
                }

                this.addMatches(wildMatches, params);
                matched = true;
            }

        }.bind(this));

        return matched;
    },

    replace: function (resRef, params) {
        var replacements;

        if (this.config.refs.replace[resRef]) {
            replacements = this.config.refs.replace[resRef];
            delete this.config.refs.replace[resRef];

            this.addMatches(replacements, params);
            return true;
        }
    }

};
