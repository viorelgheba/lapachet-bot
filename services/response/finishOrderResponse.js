'use strict';

var apiService = require('../apiService').getInstance();
var facebookApi = require('../facebookService').getInstance();

function FinishOrderResponse() {
}

FinishOrderResponse.prototype = {
    getResponse: function (productId, intervalId, userId) {
        var product = apiService.getProduct(productId);
        var order = apiService.registerOrder(productId, intervalId, userId);
        console.log("Saved order: ", JSON.stringify(product));
        var msg = "Your order #"+ order.orderId +" was received. We are waiting for yout between selected hours!";
        facebookApi.sendTextMessage(userId, msg);
        return JSON.stringify({});
    }
};

/**
 * @returns {FinishOrderResponse}
 */
module.exports.getInstance = function () {
    return new FinishOrderResponse();
};
