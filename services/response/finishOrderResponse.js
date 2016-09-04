'use strict';

var apiService = require('../apiService').getInstance();

function FinishOrderResponse() {
}

FinishOrderResponse.prototype = {
    getResponse: function (productId, intervalId, userId) {
        var product = apiService.getProduct(productId);
        var order = apiService.registerOrder(productId, intervalId, userId);
        console.log("Saved order: ", JSON.stringify(order));
        var response = {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "receipt",
                        recipient_name: userId.toString(),
                        order_number: order.orderId,
                        currency: "USD",
                        payment_method: "Visa 2345",
                        order_url: "http://petersapparel.parseapp.com/order?order_id=123456",
                        timestamp: "1428444852",
                        elements: [
                            {
                                "title": product.name,
                                "subtitle": product.description,
                                "quantity": 1,
                                "price": product.price,
                                "currency": "RON",
                                "image_url": product.image
                            }
                        ]
                    }
                }
        };

        return JSON.stringify(response);
    }
};

/**
 * @returns {FinishOrderResponse}
 */
module.exports.getInstance = function () {
    return new FinishOrderResponse();
};
