'use strict';

var mapRefs = require('../../lib/mapRefs'),
    fs = require('fs');

describe('mapRefs', function () {

    describe('map', function () {

        beforeEach(function () {
            mapRefs.config = {
                refs: {
                    blacklist: {
                    },
                    notTypes: {}
                }
            };
        });

        describe('scans a non blacklisted file', function () {

            beforeEach(function () {
                sandbox.stub(fs, 'statSync', function () {
                    return { isDirectory: function () {
                        return false;
                    }};
                });

                sandbox.stub(mapRefs, 'scan');

                mapRefs.map('pictures.txt');
            });

            it('scans the resource', function () {
                mapRefs.scan.should.have.been.calledWithExactly('pictures.txt');
            });

        });

        describe('does not scan a blacklisted file', function () {

            beforeEach(function () {
                mapRefs.config.refs.blacklist = {
                    'pictures.txt': true
                };

                sandbox.stub(fs, 'statSync', function () {
                    return { isDirectory: function () {
                        return false;
                    }};
                });

                sandbox.stub(mapRefs, 'scan');

                mapRefs.map('pictures.txt');
            });

            it('does not scan the resource', function () {
                mapRefs.scan.should.not.have.been.called;
            });

        });

        describe('scans all the non blacklisted public files in a folder', function () {

            beforeEach(function () {
                var firstCall = false;

                mapRefs.config.refs.blacklist = {
                    'web/pictures.txt': true
                };

                sandbox.stub(fs, 'statSync', function () {
                    return { isDirectory: function () {
                        if (!firstCall) {
                            firstCall = true;
                            return true;
                        }
                    }};
                });

                sandbox.stub(fs, 'readdirSync', function () {
                    return ['.private', 'thing.js', 'thing.css', 'pictures.txt'];
                });

                sandbox.stub(mapRefs, 'scan');

                mapRefs.map('web');

            });

            it('scans thing.js', function () {
                mapRefs.scan.should.have.been.calledWith('web/thing.js');
            });

            it('scans thing.css', function () {
                mapRefs.scan.should.have.been.calledWith('web/thing.css');
            });

            it('does not scan .private', function () {
                mapRefs.scan.should.not.have.been.calledWith('web/.private');
            });

            it('does not scan pictures.txt', function () {
                mapRefs.scan.should.not.have.been.calledWith('web/pictures.txt');
            });

            it('only called scan twice', function () {
                mapRefs.scan.should.have.been.calledTwice;
            });

        });

    });

    describe('addMatches', function () {

        beforeEach(function () {
            sandbox.stub(mapRefs, 'replace', function () {
                return false;
            });

            sandbox.stub(mapRefs, 'wildcard', function () {
                return false;
            });

            mapRefs.config.refs = {
                ignore: {}
            };

            mapRefs.addMatches(['file.txt'], { 'foo': 'bar' });

        });

        it('creates a reference to a match', function () {
            mapRefs.refs['file.txt'].should.deep.equal([{ 'foo': 'bar' }]);
        });
    });

    describe('wildcard', function () {

        beforeEach(function () {
            mapRefs.config = {
                resources: {
                    root: '/public'
                },
                refs: {
                    wildcards:  ['#{.*?}']
                }
            };

            sandbox.stub(fs, 'statSync', function () {
                return { isDirectory: function () {
                    return true;
                }};
            });

            sandbox.stub(fs, 'readdirSync', function () {
                return [
                    'sunny_small.gif', // should match
                    'sunny_big.gif', // should not match
                    'cloudy_small.gif', // should match
                    'cloudy_big.gif' // should not match
                ];
            });

            sandbox.stub(mapRefs, 'addMatches');

            mapRefs.wildcard('img/weather/#{JadeVar}_small.gif', { 'foo': 'bar' });
        });

        it('passes both wildcard matches to addMatches', function () {
            var matches = [
                'img/weather/sunny_small.gif',
                'img/weather/cloudy_small.gif'
            ];

            mapRefs.addMatches.args[0][0].should.deep.equal(matches);
            mapRefs.addMatches.args[0][1].should.deep.equal({ 'foo': 'bar' });
        });
    });

    describe('replace', function () {
        var res;

        beforeEach(function () {
            mapRefs.config = {
                refs: {
                    ignore: {},
                    replace: {
                        'foo.gif': ['bar.gif', 'foobar.png']
                    }
                }
            };

            res = sandbox.stub(mapRefs, 'addMatches');

            mapRefs.replace('foo.gif', { 'foo': 'bar' });
        });

        it('returns true', function () {
            res.should.be.ok;
        });

        it('adds the two replacements with the given params', function () {
            mapRefs.addMatches.should.have.been.calledOnce;
            mapRefs.addMatches.args[0][0].should.deep.equal(['bar.gif', 'foobar.png']);
            mapRefs.addMatches.args[0][1].should.deep.equal({ 'foo': 'bar' });
        });

        it('sets the path to replace as an ignore', function () {
            mapRefs.config.refs.ignore['foo.gif'].should.be.ok;
        });

        it('deletes the config reference', function () {
            (mapRefs.config.refs.replace['foo.gif'] === undefined).should.be.ok;
        });

    });
});
