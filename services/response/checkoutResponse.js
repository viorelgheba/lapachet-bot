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
                    template_type: "generic",
                    elements: [
                        {
                            "title": product.name,
                            "image_url": product.image,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Order Product",
                                    "payload": "order#" + product.id
                                }
                            ]
                        }
                    ]
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
