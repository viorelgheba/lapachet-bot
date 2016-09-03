'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var productMenu = require('../services/response/productMenuResponse').getInstance();

const MENU = 'menu';
const ALL = 'all';
const CATEGORY = 'category';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        var type = message.split('#');
        switch (type[0]) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse();
                break;
            case CATEGORY:
                return productMenu.getResponse();
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
