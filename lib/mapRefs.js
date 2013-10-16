'use strict';

var fs = require('fs'),
    path = require('path'),
    arrToObj = require('./arrayToObject'),
    getRegExp = require('./imgRegExp'),
    log = require('./log');

module.exports = {

    refs: {},

    ignore: {},

    blacklist: false,

    whitelist: false,

    config: {},

    init: function (config) {
        this.config = config;
        this.checkConf();

        if (this.whitelist) {
            this.whitelist.forEach(function (resource) {
                if (fs.existsSync(resource)) {
                    this.map(resource);
                } else {
                    log.warn(resource + ' in refs.whitelist does not exist');
                }
            });
        } else {
            this.map('./');
        }

        return this.refs;
    },

    checkConf: function () {
        this.ignore = arrToObj(this.config.refs.ignore);

        if (this.config.refs.blacklist) {
            this.blacklist = arrToObj(this.config.refs.blacklist);
        }

        if (this.config.refs.whitelist) {
            this.whitelist = arrToObj(this.config.refs.whitelist);
        }

    },

    map: function (resource) {
        if (!this.blacklist[resource]) {
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
        var regex = getRegExp(this.config);

        fs.readFileSync(resource, 'utf8').split(/\r?\n/).forEach(function (line, index) {
            var params = {
                file: resource,
                line: (index + 1)
            };

            this.addMatches((line.match(regex) || []), params);
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

            if (!this.ignore[match]) {
                if (!this.refs[match]) {
                    this.refs[match] = [];
                }

                this.refs[match].push(params);
            }
        }.bind(this));
    },

    wildcard: function (match, params) {
        this.config.refs.wildcards.forEach(function (wildcard) {
            var chunks,
                fullPath,
                wildMatches = [];

            if (match.match(wildcard)) {

                chunks = match.split(new RegExp(wildcard));

                fullPath = path.join(this.config.images.root, chunks[0]);
                if (fs.statSync(fullPath).isDirectory()) {
                    fs.readdirSync(fullPath).forEach(function (file) {
                        if (file.match(chunks[1] + '$')) {
                            wildMatches.push(path.join(chunks[0], file));
                        }
                    });
                }

                this.addMatches(wildMatches, params);
            }

        }.bind(this));
    },

    replace: function (imgRef, params) {
        var replacements;

        if (this.config.refs.replace[imgRef]) {
            replacements = this.config.refs.replace[imgRef];
            delete this.config.refs.replace[imgRef];

            this.addMatches(replacements, params);
            return true;
        }
    }

};
