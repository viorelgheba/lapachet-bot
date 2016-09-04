'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var productMenu = require('../services/response/productMenuResponse').getInstance();
var checkoutMenu = require('../services/response/checkoutResponse').getInstance();
var orderMenu = require('../services/response/orderResponse').getInstance();

const MENU = 'menu';
const ALL = 'all';
const CATEGORY = 'category';
const PRODUCT = 'product';
const ORDER_PRODUCT = 'order';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        var messages = message.split('#');
        var data = messages[1] !== undefined ? messages[1] : null;
        var type = messages[0] !== undefined ? messages[1] : null;

        console.info("type ", type);
        console.info("id ", data);

        switch (type) {
            case MENU:
                break;
            case ALL:
                console.info("step:", ALL)
                return categoryMenu.getResponse();
                break;
            case CATEGORY:
                return productMenu.getResponse();
                break;
            case PRODUCT:
                console.log("GOT PRODUCT!");
                return checkoutMenu.getResponse(data[0]);
                break;
            case ORDER_PRODUCT:
                return orderMenu.getResponse(data[0]);
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
