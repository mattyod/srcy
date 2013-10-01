'use strict';

var config = require('../config'),
    arrToObj = require('./arrayToObject'),
    types;

types = arrToObj(config.images.types);

module.exports = function(resource) {
    return types[resource.split(/\./).pop()];
};
