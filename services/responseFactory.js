'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var responsePayload = require('../services/response/responsePayload').getInstance();

const MENU = 'menu';
const ALL = 'all';

function ResponseFactory() {
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        if (message === undefined || message === undefined || message.ask === undefined) {
            return
        }
        responsePayload.setPayload(message);

        switch (responsePayload.getType()) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse();
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
