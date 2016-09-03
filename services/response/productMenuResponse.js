'use strict';

var apiService = require('../apiService').getInstance();

function ProductMenuResponse() {
    this._products = apiService.getProductsByDate();
}

ProductMenuResponse.prototype = {
    getResponse: function () {
        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Witch Product do you want?",
                    buttons: []
                }
            }
        };

        if (this._products !== undefined) {
            this._products.forEach(function (product) {
                var newButton = {
                    type: "postback",
                    title: product.name,
                    payload: {
                        data: {
                            id: product.id
                        },
                        type: "product"
                    }
                };

                response.attachment.payload.buttons.push(newButton);
            });
        }
        console.info(response);
        return JSON.stringify(response);
    }
};

/**
 * @returns {ProductMenuResponse}
 */
module.exports.getInstance = function () {
    return new ProductMenuResponse();
};
