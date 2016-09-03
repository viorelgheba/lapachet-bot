'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var responsePayload = require('../services/response/responsePayload').getInstance();

const MENU = 'menu';
const ALL = 'all';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        this.loadPayload(message);

        switch (responsePayload.getType()) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse();
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
