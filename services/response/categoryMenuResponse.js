'use strict';
var apiService = require('../apiService').getInstance();

function CategoryMenuResponse() {
    this._categories = apiService.getSellingProductCategories();
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

                newButton.payload = "category#" + category.id;
                response.attachment.payload.buttons.push(newButton);
            });
        }
        console.info("RESPONSE", response);
        return JSON.stringify(response);
    }
};

/**
 * @returns {CategoryMenuResponse}
 */
module.exports.getInstance = function () {
    return new CategoryMenuResponse();
};
