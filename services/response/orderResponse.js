'use strict';

var apiService = require('../apiService').getInstance();

function OrderResponse() {
}

OrderResponse.prototype = {
    getResponse: function (id) {
        var product = apiService.getProduct(id);
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
                    title: interval.start + interval.end,
                    payload: "order#" + product.id + "#" + interval.id
                };

                response.attachment.payload.elements.buttons.push(newButton);
            });
        }

        console.info(response);
        return JSON.stringify(response);
    }
};

/**
 * @returns {OrderResponse}
 */
module.exports.getInstance = function () {
    return new OrderResponse();
};
