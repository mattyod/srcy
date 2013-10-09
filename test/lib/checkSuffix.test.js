'use strict';
var checkSuffix = require('../../lib/checkSuffix');

describe('checkSuffix', function () {
    var types = { 'gif': true, 'png': true };

    it('matches a gif file', function () {
        checkSuffix('foo.gif', types).should.be.ok;
    });

    it('matches a png file', function () {
        checkSuffix('foo.png', types).should.be.ok;
    });

    it('does not match a tiff file', function () {
        (typeof checkSuffix('foo.tiff', types)).should.equal('undefined');
    });

});
