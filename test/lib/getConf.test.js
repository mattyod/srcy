'use strict';

var getConf = require('../../lib/getConf'),
    log = require('../../lib/log');

describe('getConf', function () {

    beforeEach(function () {
        this.stub(log);
    });

    describe('when no conf fie is present', function () {

        beforeEach(function () {
            getConf.fetch();
        });

        it('logs out an error and some info', function () {
            log.error.should.have.been.calledOnce;
            log.info.should.have.been.calledOnce;
        });

    });

    describe('when a conf file is present', function () {

        beforeEach(function () {

        });
    });

});
