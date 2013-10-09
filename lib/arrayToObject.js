'use strict';

module.exports = function (arr) {
    var obj = {};

    arr.forEach(function (item) {
        obj[item] = true;
    });

    return obj;
};
