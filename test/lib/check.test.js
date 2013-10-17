'use strict';

var check = require('../../lib/check.js'),
    feedback = require('../../lib/feedback'),
    log = require('../../lib/log');

describe('check', sandbox(function () {
    var imgs,
        refs;

    beforeEach(function () {
        imgs = {
            image1: true,
            image2: true,
            image3: true
        };

        refs = {
            image1: [
                { file: 'foo1.txt', line: 1 }
            ],
            image2: [
                { file: 'foo2.txt', line: 2 }
            ],
            image3: [
                { file: 'foo3.txt', line: 3 }
            ]
        };

        this.stub(log, 'success');

        this.stub(feedback, 'show');
    });

    describe('when all images and refs map', function () {

        beforeEach(function () {
            check(imgs, refs);
        });

        it('logs a success message', function () {
            log.success.should.have.been.calledOnce;
        });

        it('passes two empty objects to feedback', function () {
            feedback.show.args[0].should.deep.equal([ {}, {} ]);
        });

    });

    describe('when there is an unreferenced image', function () {

        beforeEach(function () {
            imgs.image4 = true;
            check(imgs, refs);
        });

        it('passes the image reference in the img object and an empty refs object', function () {
            feedback.show.args[0].should.deep.equal([ { image4: true }, {} ]);
        });

    });

    describe('when there is a reference to an image that does not exist', function () {

        beforeEach(function () {
            refs.image4 = { file: 'foo4.txt ', line: 4};
            check(imgs, refs);
        });

        it('passes the file reference in refs object and an empty img object', function () {
            feedback.show.args[0].should.deep.equal([ {}, { image4: { file: 'foo4.txt ', line: 4} } ]);
        });
    });

}));
