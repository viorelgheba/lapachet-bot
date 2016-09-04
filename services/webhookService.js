'use strict';

var responseFactory = require('../services/responseFactory').getInstance();
var facebookApi = require('../services/facebookService').getInstance();


function WebHookService() {
}

WebHookService.prototype = {
    verify: function (req) {
        var token = req.query['hub.verify_token'];
        var challenge = req.query['hub.challenge'];

        if (token === process.env.VERIFY_TOKEN) {
            return challenge;
        }

        return "Invalid token received!";
    },
    handle: function (req) {
        var data = req.body;
        if (data.object == 'page') {
            data.entry.forEach(function (pageEntry) {
                var pageID = pageEntry.id;
                var timeOfEvent = pageEntry.time;

                // Iterate over each messaging event
                pageEntry.messaging.forEach(function (messagingEvent) {

                    console.info("Message", JSON.stringify(messagingEvent));
                    var senderId = messagingEvent.sender.id;
                    if (messagingEvent.optin) {
                        //receivedAuthentication(messagingEvent);
                    } else if (messagingEvent.message) {
                        var msg = responseFactory.getResponse(messageEvent.message.text, senderId);
                        console.log("MSG : ", msg);
                        if (postBackMsg !== undefined) {
                            facebookApi.sendMessage(senderId, msg);
                        }
                    } else if (messagingEvent.delivery) {
                        //receivedDeliveryConfirmation(messagingEvent);
                    } else if (messagingEvent.postback) {
                        console.info("Messager : ", JSON.stringify(messagingEvent));
                        facebookApi.registerUser(messagingEvent.sender.id);
                        var payload = messagingEvent.postback.payload;
                        console.log("PayLoad", payload);
                        var postBackMsg = responseFactory.getResponse(messagingEvent.postback.payload, senderId);
                        if (postBackMsg !== undefined) {
                            facebookApi.sendMessage(senderId, postBackMsg);
                        }
                    } else if (messagingEvent.read) {
                        //receivedMessageRead(messagingEvent);
                    } else if (messagingEvent.account_linking) {
                        //receivedAccountLink(messagingEvent);
                    } else {
                        console.log("Webhook received unknown messagingEvent: ", messagingEvent);
                    }
                });
            });
        }
    }

};

/**
 * @returns {WebHookService}
 */
module.exports.getInstance = function () {
    return new WebHookService();
};
