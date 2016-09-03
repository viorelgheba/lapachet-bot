'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var productMenu = require('../services/response/productMenuResponse').getInstance();
var responsePayload = require('../services/response/responsePayload').getInstance();

const MENU = 'menu';
const ALL = 'all';
const CATEGORY = 'category'

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        this.loadPayload(message);
        if (message === MENU) {
            responsePayload.setType(MENU);
        }
        if (message === ALL) {
            responsePayload.setType(ALL);
        }

        switch (responsePayload.getType()) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse();
                break;
            case CATEGORY:
                return productMenu.getResponse();
                break;
        }
    },
    loadPayload: function (payload) {
        if (payload === undefined || payload === undefined || payload.type === undefined) {

            return;
        }

        return responsePayload.setPayload(payload);
    }
};

/**
 * @returns {ResponseFactory}
 */
module.exports.getInstance = function () {
    return new ResponseFactory();
};
