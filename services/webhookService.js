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
                    console.info(messagingEvent);
                    if (messagingEvent.optin) {
                        //receivedAuthentication(messagingEvent);
                    } else if (messagingEvent.message) {
                        console.log('Text: ', messagingEvent.message.text);
                        var msg = responseFactory.getResponse(messagingEvent.message.text);
                        console.log(msg);
                        facebookApi.sendMessage(senderId, msg);
                    } else if (messagingEvent.delivery) {
                        //receivedDeliveryConfirmation(messagingEvent);
                    } else if (messagingEvent.postback) {
                        console.log('Postback: ', messagingEvent.postback);
                        var postBackMsg = responseFactory.getResponse(messagingEvent.postback.payload);
                        console.log('PostBack Message: ', postBackMsg);
                        facebookApi.sendMessage(senderId, postBackMsg);
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
