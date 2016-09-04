'use strict';

var apiService = require('../apiService').getInstance();

function SelectIntervalResponse() {
}

SelectIntervalResponse.prototype = {
    getResponse: function (intervalId, productId) {
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
                    title: interval.start + interval.end,
                    payload: "order#" + product.id + "#" + interval._id
                };

                response.attachment.payload.elements.buttons.push(newButton);
            });
        }
        return JSON.stringify(response);
    }
};

/**
 * @returns {SelectIntervalResponse}
 */
module.exports.getInstance = function () {
    return new SelectIntervalResponse();
};
