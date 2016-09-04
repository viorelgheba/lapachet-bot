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
            var intervalNo = 0;
            intervals.forEach(function (interval) {
                if (intervalNo < 3) {
                    var newButton = {
                        type: "postback",
                        title: "Interval" + interval.time_start.toString() + interval.time_end.toString(),
                        payload: "order#" + product._id + "#" + interval.id
                    };
                    console.info("Interval : ", interval);
                    response.attachment.payload.elements[0].buttons.push(newButton);
                    intervalNo++;
                }
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
