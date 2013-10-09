'use strict';
var feedback = require('../../lib/feedback'),
    log = require('../../lib/log');

describe('feedback', function () {
    var imgs = {},
        refs = {};

    beforeEach(function () {
        this.stub(log);
    });

    describe('with no imgs or refs', function () {

        beforeEach(function () {
            feedback.show(imgs, refs);
        });

        it('Makes no calls to log', function () {
            log.warn.should.not.have.been.called;
            log.error.should.not.have.been.called;
            log.info.should.not.have.been.called;
        });

    });

    describe('with imgs', function () {

        beforeEach(function () {
            imgs = { 'img1': true, 'img2': true };
            feedback.show(imgs, refs);
        });

        it('logs two warnings', function () {
            log.warn.callCount.should.equal(2);
            log.warn.args[0][0].should.equal('image never referenced - img1');
            log.warn.args[1][0].should.equal('image never referenced - img2');
        });

    });

    describe('with refs', function () {

        beforeEach(function () {
            refs = {
                'img1': [{ file: 'foo1', line: 1 }],
                'img2': [{ file: 'foo2', line: 2 }, { file: 'foo3', line: 3 }]
            };
            feedback.show(imgs, refs);
        });

        it('logs two errors and three infos', function () {
            log.error.callCount.should.equal(2);
            log.info.callCount.should.equal(3);
            log.info.args[0][0].should.equal('img1: foo1 (line: 1)');
            log.info.args[1][0].should.equal('img2: foo2 (line: 2)');
            log.info.args[2][0].should.equal('img2: foo3 (line: 3)');
        });

    });
});
