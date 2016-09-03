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
                return categoryMenu.getResponse(message);
                break;
        }
    }
};

module.exports.getInstance = function () {
    return new ResponseFactory();
};
