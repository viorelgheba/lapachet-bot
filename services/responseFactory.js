'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();

const MENU = 'menu';
const ALL = 'all';
const INSTANCE = new ResponseFactory();

function ResponseFactory() {}

ResponseFactory.prototype = {
    getResponse: function (message) {
        switch (message) {
            case menu:
                break;
            case all:
                return categoryMenu.getResponse();
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
