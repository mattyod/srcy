'use strict';
var feedback = require('../../lib/feedback'),
    log = require('../../lib/log');

describe('feedback', sandbox(function () {
    var resources = {},
        refs = {};

    beforeEach(function () {
        sandbox.stub(log);
    });

    describe('with no resources or refs', function () {

        beforeEach(function () {
            feedback.show(resources, refs);
        });

        it('Makes no calls to log', function () {
            log.warn.should.not.have.been.called;
            log.error.should.not.have.been.called;
            log.info.should.not.have.been.called;
        });

    });

    describe('with resources', function () {

        beforeEach(function () {
            resources = { 'res1': true, 'res2': true };
            feedback.show(resources, refs);
        });

        it('logs two warnings', function () {
            log.warn.callCount.should.equal(2);
            log.warn.args[0][0].should.equal('resource never referenced - res1');
            log.warn.args[1][0].should.equal('resource never referenced - res2');
        });

    });

    describe('with refs', function () {

        beforeEach(function () {
            refs = {
                'res1': [{ file: 'foo1', line: 1 }],
                'res2': [{ file: 'foo2', line: 2 }, { file: 'foo3', line: 3 }]
            };
            feedback.show(resources, refs);
        });

        it('logs two errors and three infos', function () {
            log.error.callCount.should.equal(2);
            log.info.callCount.should.equal(3);
            log.info.args[0][0].should.equal('res1: foo1 (line: 1)');
            log.info.args[1][0].should.equal('res2: foo2 (line: 2)');
            log.info.args[2][0].should.equal('res2: foo3 (line: 3)');
        });

    });
}));
