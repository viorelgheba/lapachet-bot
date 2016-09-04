'use strict';

var apiService = require('../apiService').getInstance();

function CheckoutResponse() {
}

CheckoutResponse.prototype = {
    getResponse: function (productId) {
        var product = apiService.getProduct(productId);
        var intervals = apiService.getIntervals();

        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: product.name,
                            image_url: product.image,
                            subtitle: product.description,
                            buttons: []
                        }
                    ]
                }
            }
        };

        if (intervals !== undefined) {
            intervals.forEach(function (interval) {
                var newButton = {
                    type: "postback",
                    title: interval.time_start + interval.time_end,
                    payload: "order#" + product._id + "#" + interval.id
                };
                console.info("Interval : ", interval);
                response.attachment.payload.elements.buttons.push(newButton);
            });
        }
        return JSON.stringify(response);
    }
};

/**
 * @returns {CheckoutResponse}
 */
module.exports.getInstance = function () {
    return new CheckoutResponse();
};
