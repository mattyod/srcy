'use strict';

var fs = require('fs'),
    path = require('path'),
    arrToObj = require('./arrayToObject'),
    getRegExp = require('./resRegExp'),
    checkSuffix = require('./checkSuffix.js'),
    log = require('./log');

module.exports = {

    refs: {},

    ignore: {},

    blacklist: false,

    notTypes: false,

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
            }.bind(this));
        } else {
            this.map('./');
        }

        return this.refs;
    },

    checkConf: function () {

        this.ignore = this.config.refs.ignore;

        this.blacklist = this.config.refs.blacklist;

        this.whitelist = this.config.refs.whitelist;

    },

    map: function (resource) {
        if (!this.blacklist[resource] && !checkSuffix(resource, this.notTypes)) {
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
