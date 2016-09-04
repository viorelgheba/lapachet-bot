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
        console.info(data);
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
                        this.textMessage(messagingEvent);
                    } else if (messagingEvent.delivery) {
                        //receivedDeliveryConfirmation(messagingEvent);
                    } else if (messagingEvent.postback) {
                        this.postBack(messagingEvent);
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
    },
    postBack: function (messagingEvent) {
        var payload = messagingEvent.postback.payload;
        var postBackMsg = responseFactory.getResponse(messagingEvent.postback.payload);
        if (postBackMsg !== undefined) {
            facebookApi.sendMessage(senderId, postBackMsg);
        }
    },
    textMessage: function (messagingEvent) {
        console.log('Text: ', messagingEvent.message.text);
        var msg = responseFactory.getResponse(messagingEvent.message.text);
        if (msg !== undefined) {
            facebookApi.sendMessage(senderId, msg);
        }
    }

};

/**
 * @returns {WebHookService}
 */
module.exports.getInstance = function () {
    return new WebHookService();
};
