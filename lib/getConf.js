'use strict';

var fs = require('fs'),
    log = require('./log'),
    glob = require('glob'),
    arrToObj = require('./arrayToObject');

module.exports = {

    fetch: function () {
        var config;

        if (fs.existsSync('./srcy.conf.json')) {
            config = JSON.parse(fs.readFileSync('./srcy.conf.json', 'utf8'));
            return this.parse(config);
        } else {
            log.error('Unable to find srcy.conf.json file in project root');
            log.info('A blank conf file can be created with "srcy init" if installed globally');
        }
    },

    parse: function (config) {
        var options = { sync: true };

        config.refs.ignore = arrToObj(config.refs.ignore);

        if (config.refs.blacklist) {
            config.refs.blacklist = arrToObj(this.jiggle(config.refs.blacklist));
        }

        if (config.refs.whitelist) {
            config.refs.whitelist = arrToObj(this.jiggle(config.refs.whitelist));    
        }

        return config;
    },

    jiggle: function (list) {
        var options = { sync: true },
            newList = [];

        if (list) {

            list.forEach(function (item, index) {
                newList = newList.concat(glob(item, options));
            });

            return newList;
        } else {
            return list;
        }

    }

};
