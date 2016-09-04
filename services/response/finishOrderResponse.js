'use strict';

var apiService = require('../apiService').getInstance();

function FinishOrderResponse() {
}

FinishOrderResponse.prototype = {
    getResponse: function (productId, intervalId, userId) {
        var product = apiService.getProduct(productId);
        var order = apiService.registerOrder(productId, intervalId, userId);
        console.log("Saved order: ", JSON.stringify(product));
        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: userId.toString(),
                    order_number: order.orderId.toString(),
                    currency: "USD",
                    payment_method: "Visa 2345",
                    order_url: "http://petersapparel.parseapp.com/order?order_id=123456",
                    timestamp: new Date().getTime(),
                    elements: [
                        {
                            "title": product.name,
                            "subtitle": product.description,
                            "quantity": 1,
                            "price": product.base_price == undefined ? 0 : product.base_price,
                            "currency": "RON",
                            "image_url": product.image
                        }
                    ],
                    summary: {
                        subtotal: product.base_price,
                        shipping_cost: 0,
                        total_tax: product.base_price / 0.24,
                        total_cost: product.base_price
                    },
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
