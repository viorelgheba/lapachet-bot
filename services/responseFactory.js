'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var apiService = require('../services/apiService');

const MENU = 'menu';
const ALL = 'all';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        console.info("SWITCH", message);
        switch (message) {
            case MENU:
                break;
            case ALL:
                console.log("SWITCH", "Got All!");
                return categoryMenu.getResponse();
                break;
        }
    }
};

/**
 * @returns {ResponseFactory}
 */
module.exports.getInstance = function () {
    return new ResponseFactory();
};
