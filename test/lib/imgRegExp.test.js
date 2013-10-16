'use strict';

var imgRegExp = require('../../lib/imgRegExp');

describe('imgRegExp', sandbox(function () {
    var reg,
        conf = {
            images: {
                types: ['gif', 'png'],
                folders: ['img', 'images']
            }
        };

    beforeEach(function () {
        reg = imgRegExp(conf);
    });

    it('matches a gif in the img folder', function () {
        'img/path/thing.gif'.match(reg).should.be.ok;
        '/img/path/thing.gif'.match(reg).should.be.ok;
        'img/{variable}/thing.gif'.match(reg).should.be.ok;
    });

    it('matches a png in the img folder', function () {
        'img/path/thing.png'.match(reg).should.be.ok;
        '/img/path/thing.png'.match(reg).should.be.ok;
        'img/{variable}/thing.png'.match(reg).should.be.ok;
    });

    it('matches a gif in the images folder', function () {
        'images/path/thing.gif'.match(reg).should.be.ok;
        '/images/path/thing.gif'.match(reg).should.be.ok;
        'images/{variable}/thing.gif'.match(reg).should.be.ok;
    });

    it('matches a png in the images folder', function () {
        'images/path/thing.png'.match(reg).should.be.ok;
        '/images/path/thing.png'.match(reg).should.be.ok;
        'images/{variable}/thing.png'.match(reg).should.be.ok;
    });

    it('does not match these things', function () {
        // ('IMAGES/path/thing.png'.match(reg) === null).should.be.ok;
        // ('images/path/thing.pnga'.match(reg) === null).should.be.ok;
        // ('images/path/thing.png1'.match(reg) === null).should.be.ok;
        // ('rimages/path/thing.png'.match(reg) === null).should.be.ok;
        ('-images/#{variable}/thing.png'.match(reg) === null).should.be.ok;
        ('images/path/thing.png-asd'.match(reg) === null).should.be.ok;
        ('images/path/thing.png-'.match(reg) === null).should.be.ok;
        ('.images.path.thing.png'.match(reg) === null).should.be.ok;
    });

}));
