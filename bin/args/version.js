'use strict';
var log = require('../../lib/log');

module.exports = (function () {

    log.success('v' + require('../../package.json').version);

    // Exit the application with a success code
    process.exit(0);

})();
