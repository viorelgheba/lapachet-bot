'use strict';
var apiService = require('../services/apiService').getInstance();

function CategoryMenuResponse() {
    this._categories = apiService.getProductCategories();
}

CategoryMenuResponse.prototype = {
    getResponse: function (categories) {
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

        if (categories !== undefined) {
            categories.forEach(function (category) {
                var newButton = {
                    type: "postback",
                    title: category.title,
                    payload: category.name
                };
                console.log("new button", newButton);
                response.attachment.payload.buttons.push(newButton);
            });
        }

        return JSON.stringify(response);
    }
};

/**
 * @returns {CategoryMenuResponse}
 */
module.exports.getInstance = function () {
    return new CategoryMenuResponse();
};
