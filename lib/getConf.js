'use strict';

var fs = require('fs'),
    log = require('./log');

module.exports = {
    fetch: function () {
        if (fs.existsSync('./srcy.conf.json')) {
            return JSON.parse(fs.readFileSync('./srcy.conf.json', 'utf8'));
        } else {
            log.error('Unable to find srcy.conf.json file in project root');
            log.info('A blank conf file can be created with "srcy init" if installed globally');
        }
    }
};
