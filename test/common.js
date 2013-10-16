'use strict';
/*global window */
global.sinon = require('sinon');
global.should = require('chai').use(require('sinon-chai')).should();

(function (global) {
    global.sandbox = function (fn) {

        beforeEach(function () {
            global.sandbox = global.sinon.sandbox.create({
                injectInto: this,
                properties: ['spy', 'stub', 'mock']
            });
        });

        afterEach(function () {
            global.sandbox.restore();
        });

        return fn;
    };
})(typeof global === 'undefined' ? window : global);
