'use strict';

module.exports = function (resource, types) {
    return types[resource.split(/\./).pop()];
};
