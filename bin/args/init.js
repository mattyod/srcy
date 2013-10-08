'use strict';
var fs = require('fs'),
    path = require('path');

module.exports = (function () {
    var conf,
        force = process.argv.slice(3);

    conf = fs.readFileSync(path.join(process.cwd(), 'bin/resources/srcy.conf.js'), 'utf8');

    if (!force.length && fs.existsSync('srcy.conf.js')) {
        console.log('Srcy: srcy.conf file already exists');
        console.log('Srcy: use "srcy init -f" to over-write it with a blank conf file');
        process.exit(1);
    }

    fs.writeFileSync('srcy.conf.js', conf.toString(), 'utf8');

    console.log('Srcy: blank srcy.conf.js file created');

    process.exit(0);

})();
