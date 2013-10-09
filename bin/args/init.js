'use strict';
var fs = require('fs'),
    path = require('path'),
    log = require('../../lib/log');

var getConf = function () {
    var target = process.mainModule.filename.split('/');
    target.pop();
    return path.join(target.join('/'), 'resources/srcy.conf.json');
};

var isForced = function () {
    return process.argv[3] && process.argv[3].match(/-f/);
};

module.exports = (function () {
    var conf = fs.readFileSync(getConf(), 'utf8');

    if (!isForced() && fs.existsSync('srcy.conf.json')) {
        log.warn('srcy.conf file already exists');
        log.info('use "srcy init -f" to over-write it with a blank conf file');
        process.exit(1);
    }

    fs.writeFileSync('srcy.conf.json', conf, 'utf8');

    log.success('blank srcy.conf.json file created');

    process.exit(0);

})();
