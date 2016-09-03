'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();

const MENU = 'menu';
const ALL = 'all';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        switch (message) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse();
                break;
            default:
                return "dadsasdas";
                break;
        }
    }
};

/**
 * @returns {ResponseFactory}
 */
module.exports.getInstance = function () {
    new ResponseFactory();
};
