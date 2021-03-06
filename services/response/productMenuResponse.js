'use strict';

var apiService = require('../apiService').getInstance();

function ProductMenuResponse() {

}

ProductMenuResponse.prototype = {

    getResponse: function (categoryId) {
        var products = apiService.getSellingProducts(categoryId);
        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Which Product do you want?",
                    buttons: []
                }
            }
        };

        if (products !== undefined) {
            products.forEach(function (product) {
                var newButton = {
                    type: "postback",
                    title: product.name,
                    payload: "product#" + product._id
                };

                response.attachment.payload.buttons.push(newButton);
            });
        }

        return JSON.stringify(response);
    }
};

/**
 * @returns {ProductMenuResponse}
 */
module.exports.getInstance = function () {
    return new ProductMenuResponse();
};
