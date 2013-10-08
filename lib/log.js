'use strict';

var colors = {
    error: '\u001b[31m',
    warn: '\u001b[33m',
    normal: '\u001b[39m',
    srcy: '\u001b[32m'
};

module.exports = {

    error: function (msg) {
        this.log(colors.error + 'ERROR: ' + colors.normal + ' ' + msg);
    },

    warn: function (msg) {
        this.log(colors.warn + 'WARNING: ' + colors.normal + ' ' + msg);
    },

    info: function (msg) {
        console.log('    ', msg);
    },

    log: function (msg) {
        console.log(colors.srcy + 'Srcy ' + msg);
    }

};
