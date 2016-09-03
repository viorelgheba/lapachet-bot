'use strict';

function CategoryMenuResponse() {
}

CategoryMenuResponse.prototype = {
    getResponse: function (categories) {
        var response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "What do you want to do next?",
                    buttons: [
                        {
                            type: "postback",
                            title: "Pizza",
                            payload: "category_1"
                        },
                        {
                            type: "postback",
                            title: "Paste",
                            payload: "category_2"
                        },
                        {
                            type: "postback",
                            title: "Ciorbe",
                            payload: "category_3"
                        }
                    ]
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
                response.attachment.payload.buttons.add(newButton);
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
