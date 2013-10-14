'use strict';

var mapImages = require('../../lib/mapImages'),
    log = require('../../lib/log'),
    fs = require('fs');

describe('mapImages', sandbox(function () {
    var files,
        config = {
            images: {
                root: 'foo',
                ignore: [],
                types: ['gif'],
                folders: []
            }
        };

    describe('when folder does not exist', function () {

        beforeEach(function () {

            config.images.folders = ['img'];

            this.stub(fs, 'existsSync', function () {
                return false;
            });

            this.stub(log, 'error');

            files = mapImages(config);

        });


        it('logs an error', function () {
            log.error.should.have.been.calledOnce;
        });

    });

    describe('when a file exists', function () {

        beforeEach(function () {

            config.images.folders = ['file.gif'];

            this.stub(fs, 'existsSync', function () {
                return true;
            });

            this.stub(fs, 'statSync', function () {
                return { isDirectory: function () {
                    return false;
                }}
            });

            files = mapImages(config);

        });

        it('maps it', function () {
            files.should.deep.equal({ "file.gif": true });
        });

    });

    describe('when a folder contains files', function () {

        beforeEach(function () {

            config.images.folders = ['img'];

            this.stub(fs, 'existsSync', function () {
                return true;
            });

            this.stub(fs, 'statSync', function () {
                return { isDirectory: function () {
                    return false;
                }}
            });

            this.stub('fs', readdirSync, function () {
                return
            });

        });

        this.

    });

}));