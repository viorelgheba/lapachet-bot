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
        var type = message.split('#');
        var id = type[1];

        console.info("type ", type[0]);
        console.info("id ", id);

        switch (type[0]) {
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
