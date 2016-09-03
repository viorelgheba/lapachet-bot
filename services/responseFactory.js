'use strict';

var categoryMenu = require('../services/response/categoryMenuResponse').getInstance();
var apiService = require('../services/apiService').getInstance();

const MENU = 'menu';
const ALL = 'all';

function ResponseFactory() {
    this._categories = apiService.getProductCategories();
}

ResponseFactory.prototype = {
    getResponse: function (message) {
        switch (message) {
            case MENU:
                break;
            case ALL:
                return categoryMenu.getResponse(this._categories);
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
