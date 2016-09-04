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
        console.info("Categories: ", JSON.stringify(categories));
        if (categories !== undefined) {
            var categoriesNo = 0;
            categories.forEach(function (category) {
                if (categoriesNo < 4) {
                    var newButton = {
                        type: "postback",
                        title: category.name,
                        payload: {}
                    };
                    console.info("Category: ", JSON.stringify(category));
                    newButton.payload = "category#" + category._id;
                    response.attachment.payload.buttons.push(newButton);
                    categoriesNo++;
                }
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
