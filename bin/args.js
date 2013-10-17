'use strict';

module.exports = (function () {
    var args = process.argv.slice(2);

    if (args.length) {

        switch (args[0]) {
        case '--version':
        case '-version':
        case '--v':
        case '-v':
            require('./args/version');
            break;
        case 'init':
            require('./args/init');
        }
    } else {
        return false;
    }

})();
