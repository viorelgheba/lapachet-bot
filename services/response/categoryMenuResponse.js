'use strict';
var apiService = require('../apiService').getInstance();
var responsePayload = require('./responsePayload').getInstance();

function CategoryMenuResponse() {
    this._categories = apiService.getProductCategories();
}

CategoryMenuResponse.prototype = {
    getResponse: function () {
        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "What do you want to do next?",
                    buttons: []
                }
            }
        };

        if (this._categories !== undefined) {
            this._categories.forEach(function (category) {
                var newButton = {
                    type: "postback",
                    title: category.title,
                    payload: {}
                };

                var payloadJson = JSON.stringify({
                    data: {
                        id: category.id
                    },
                    type: "product"
                });
                console.log(payloadJson);
                newButton.payload = payloadJson;
                console.log(newButton.payload);
                response.attachment.payload.buttons.push(newButton);
            });
        }
        console.info(response);
        return JSON.stringify(response);
    }
};

/**
 * @returns {CategoryMenuResponse}
 */
module.exports.getInstance = function () {
    return new CategoryMenuResponse();
};
