'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var productMenu = require('../services/response/productMenuResponse').getInstance();
var checkoutMenu = require('../services/response/checkoutResponse').getInstance();

const MENU = 'menu';
const ALL = 'all';
const CATEGORY = 'category';
const PRODUCT = 'product';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        var messages = message.split('#');
        var id = messages[1];
        var type = messages[0];

        console.info("type ", type);
        console.info("id ", id);

        switch (type) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse();
                break;
            case CATEGORY:
                return productMenu.getResponse();
                break;
            case PRODUCT:
                console.log("GOT PRODUCT!");
                return checkoutMenu.getResponse(id);
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
