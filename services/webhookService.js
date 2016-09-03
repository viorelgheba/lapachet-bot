'use strict';

var responseFactory = require('../services/responseFactory').getInstance();
var facebookApi = require('../services/facebookService').getInstance();

function WebHookService() {}

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
                    var senderId = messagingEvent.sender.id;

                    if (messagingEvent.optin) {
                        //receivedAuthentication(messagingEvent);
                    } else if (messagingEvent.message) {
                        facebookApi.sendTextMessage(
                            senderId,
                            responseFactory.getResponse(messagingEvent.message.text)
                        );
                    } else if (messagingEvent.delivery) {
                        //receivedDeliveryConfirmation(messagingEvent);
                    } else if (messagingEvent.postback) {
                        facebookApi.sendTextMessage(
                            senderId,
                            responseFactory.getResponse(messagingEvent.postback.payload)
                        );
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
