'use strict';

var apiService = require('../apiService').getInstance();

function CheckoutResponse() {
}

CheckoutResponse.prototype = {
    getResponse: function (id) {
        var product = apiService.getProduct(id);

        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: product.name,
                    order_number: "12345678902",
                    currency: "USD",
                    payment_method: "Numerar",
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
                    ],
                    summary: {
                        subtotal: 75.00,
                        shipping_cost: 4.95,
                        total_tax: 6.19,
                        total_cost: 56.14
                    }
                }
            }
        };

        console.info(response);
        return JSON.stringify(response);
    }
};

/**
 * @returns {CheckoutResponse}
 */
module.exports.getInstance = function () {
    return new CheckoutResponse();
};
