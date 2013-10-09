'use strict';

var arrToObj = require('../../lib/arrayToObject');

describe('arrayToObject', sandbox(function () {
    var array = ['one', 'two', 'three'],
        obj = {
            one: true,
            two: true,
            three: true
        };

    it('converts array to object with values of true', function () {
        arrToObj(array).should.deep.equal(obj);
    });

}));
