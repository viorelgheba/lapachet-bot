'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();

const MENU = 'menu';
const ALL = 'all';
const INSTANCE = new ResponseFactory();

function ResponseFactory() {}

ResponseFactory.prototype = {
    getResponse: function (recipientId, message) {
        switch (message) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse(message);
                break;
        }
    }
};

/**
 * @returns {ResponseFactory}
 */
module.exports.getInstance = function () {
    return INSTANCE;
};
