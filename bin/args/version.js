'use strict';
var log = require('col');

module.exports = (function () {

    log.success('v' + require('../../package.json').version);

    // Exit the application with a success code
    process.exit(0);

})();
