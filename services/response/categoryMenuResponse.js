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
                    text: "Pick a category?",
                    buttons: []
                }
            }
        };
        console.log("Category 1st response", response);
        if (this._categories !== undefined) {
            this._categories.forEach(function (category) {
                console.info("category", category);
                var newButton = {
                    type: "postback",
                    title: category.name,
                    payload: {}
                };

                newButton.payload = "category#" + category._id;
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
