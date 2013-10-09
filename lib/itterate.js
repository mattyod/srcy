'use strict';

module.exports = function (obj, callback) {
    var item;

    for (item in obj) {
        if (obj.hasOwnProperty(item)) {
            callback(obj[item], item);
        }
    }
};
