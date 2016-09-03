'use strict';

function CategoryMenuResponse() {
}

CategoryMenuResponse.prototype = {
    getResponse: function () {
        return JSON.stringify({
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
        });
    }
};

/**
 * @returns {CategoryMenuResponse}
 */
module.exports.getInstance = function () {
    return new CategoryMenuResponse();
};
