'use strict';

var apiService = require('../apiService').getInstance();

function FinishOrderResponse() {
}

FinishOrderResponse.prototype = {
    getResponse: function (productId, intervalId, userId) {
        var product = apiService.getProduct(productId);
        var order = apiService.registerOrder(productId, intervalId, userId);
        console.log(JSON.stringify(order));
        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: "Stephane Crozatier",
                    order_number: "12345678902",
                    currency: "USD",
                    payment_method: "Visa 2345",
                    order_url: "http://petersapparel.parseapp.com/order?order_id=123456",
                    timestamp: "1428444852",
                    elements: [
                        {
                            "title": "Classic White T-Shirt",
                            "subtitle": "100% Soft and Luxurious Cotton",
                            "quantity": 2,
                            "price": 50,
                            "currency": "USD",
                            "image_url": "http://petersapparel.parseapp.com/img/whiteshirt.png"
                        },
                        {
                            "title": "Classic Gray T-Shirt",
                            "subtitle": "100% Soft and Luxurious Cotton",
                            "quantity": 1,
                            "price": 25,
                            "currency": "USD",
                            "image_url": "http://petersapparel.parseapp.com/img/grayshirt.png"
                        }
                    ]
                }
            }
        };

        if (intervals !== undefined) {
            intervals.forEach(function (interval) {
                var newButton = {
                    type: "postback",
                    title: interval.start + interval.end,
                    payload: "finish-order#" + product._id + "#" + interval._id
                };

                response.attachment.payload.elements.buttons.push(newButton);
            });
        }
        return JSON.stringify(response);
    }
};

/**
 * @returns {FinishOrderResponse}
 */
module.exports.getInstance = function () {
    return new FinishOrderResponse();
};
