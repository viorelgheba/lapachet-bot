'use strict';
var apiService = require('../apiService').getInstance();

function CategoryMenuResponse() {
}

CategoryMenuResponse.prototype = {
    getResponse: function () {
        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Pick a category?",
                    buttons: []
                }
            }
        };
        var categories = apiService.getSellingProductCategories();
        if (categories !== undefined) {
            categories.forEach(function (category) {

                var newButton = {
                    type: "postback",
                    title: category.name,
                    payload: {}
                };

                newButton.payload = "category#" + category._id;
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
