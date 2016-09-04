'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var productMenu = require('../services/response/productMenuResponse').getInstance();
var checkoutMenu = require('../services/response/checkoutResponse').getInstance();
var orderMenu = require('../services/response/orderResponse').getInstance();
var dailyMenuResponse = require('../services/response/dailyMenuResponse').getInstance();
var finishOrderMenu = require('../services/response/finishOrderResponse').getInstance();

const MENU = 'menu';
const ALL = 'all';
const CATEGORY = 'category';
const PRODUCT = 'product';
const ORDER_PRODUCT = 'order';
const FINISH_ORDER = 'finish-order';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (messageEvent) {
        var message = messageEvent.message.text;
        var senderId = messageEvent.sender.id;
        var messages = message.split('#');

        var type = messages[0];
        var data = null;
        if (messages.length > 1) {
            data = messages[1];
        }

        console.info("Request Type : ", type);
        console.info("Request Data : ", data);

        switch (type) {
            case MENU:
                return dailyMenuResponse.getResponse(data);
                break;
            case ALL:
                return categoryMenu.getResponse();
                break;
            case CATEGORY:
                return productMenu.getResponse(data);
                break;
            case PRODUCT:
                return checkoutMenu.getResponse(data);
                break;
            case ORDER_PRODUCT:
                return orderMenu.getResponse(data);
                break;
            case FINISH_ORDER:
                return finishOrderMenu.getResponse(messages[1], messages[2], senderId);
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
