var express = require('express');
var router = express.Router();
var webhook = require('../services/webhookService');
var facebook = require('../services/facebookService');

/* GET webhook page. */
router.get('/', function (req, res) {
    var WebHookService = new webhook.WebHookService();
    res.send(WebHookService.verify(req));
});

router.post('/', function (req, res) {
    var data = req.body;
    var facebookService = new facebook.FacebookService();

    if (data.object == 'page') {
        data.entry.forEach(function (pageEntry) {
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;

            // Iterate over each messaging event
            pageEntry.messaging.forEach(function (messagingEvent) {
                if (messagingEvent.optin) {
                    //receivedAuthentication(messagingEvent);
                } else if (messagingEvent.message) {
                    facebookService.sendTextMessage(messagingEvent.message.text);
                } else if (messagingEvent.delivery) {
                    //receivedDeliveryConfirmation(messagingEvent);
                } else if (messagingEvent.postback) {
                    facebookService.sendTextMessage("Postback test");
                    //receivedPostback(messagingEvent);
                } else if (messagingEvent.read) {
                    //receivedMessageRead(messagingEvent);
                } else if (messagingEvent.account_linking) {
                    //receivedAccountLink(messagingEvent);
                } else {
                    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
                }
            });
        });

        res.sendStatus(200);
    }
});

module.exports = router;
