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
        console.log("1st", response);
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
        console.log("2st", response);
        return JSON.stringify(response);
    }
};

/**
 * @returns {CategoryMenuResponse}
 */
module.exports.getInstance = function () {
    return new CategoryMenuResponse();
};
