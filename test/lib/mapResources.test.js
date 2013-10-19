'use strict';

var mapResources = require('../../lib/mapResources'),
    log = require('../../lib/log'),
    fs = require('fs');

describe('mapResources', sandbox(function () {
    var files,
        config = {
            resources: {
                root: 'foo',
                ignore: [],
                types: ['gif', 'png'],
                folders: []
            }
        };

    describe('when folder does not exist', function () {

        beforeEach(function () {

            config.resources.folders = ['img'];

            this.stub(fs, 'existsSync', function () {
                return false;
            });

            this.stub(log, 'error');

            files = mapResources(config);

        });


        it('logs an error', function () {
            log.error.should.have.been.calledOnce;
        });

    });

    describe('when a file exists', function () {

        beforeEach(function () {

            config.resources.folders = ['file.gif'];

            this.stub(fs, 'existsSync', function () {
                return true;
            });

            this.stub(fs, 'statSync', function () {
                return { isDirectory: function () {
                    return false;
                }};
            });

            files = mapResources(config);

        });

        it('maps it', function () {
            files.should.deep.equal({ 'file.gif': true });
        });

    });

    describe('when a folder contains files', function () {

        beforeEach(function () {
            var firstCall = false;

            config.resources.folders = ['img'];

            this.stub(fs, 'existsSync', function () {
                return true;
            });

            this.stub(fs, 'statSync', function () {
                return { isDirectory: function () {
                    if (!firstCall) {
                        firstCall = true;
                        return true;
                    }
                }};
            });

            this.stub(fs, 'readdirSync', function () {
                return ['.private', 'thing.gif', 'thing.png'];
            });

        });

        it('returns all non private files', function () {
            var expected = {
                'img/thing.gif': true,
                'img/thing.png': true
            };

            files = mapResources(config);

            files.should.deep.equal(expected);
        });

        describe('when a file is specified to be ignored', function () {

            beforeEach(function () {
                config.resources.ignore = ['img/thing.png'];

                files = mapResources(config);
            });

            it('does not return the ignored file', function () {
                var expected = {
                    'img/thing.gif': true
                };

                files.should.deep.equal(expected);
            });

        });

    });

}));
