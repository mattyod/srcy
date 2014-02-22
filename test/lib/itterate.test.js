'use strict';

var itterate = require('../../lib/itterate');

describe('itterate', sandbox(function () {
    var callback,
        obj = {
            item1: 'foo',
            item2: 'bar'
        };

    beforeEach(function () {
        callback = sandbox.spy();
        itterate(obj, callback);
    });

    it('Executes the callback for each itteration passing value and key', function () {
        callback.should.have.been.calledTwice;
        callback.firstCall.args[0].should.equal('foo');
        callback.firstCall.args[1].should.equal('item1');
        callback.secondCall.args[0].should.equal('bar');
        callback.secondCall.args[1].should.equal('item2');
    });

}));