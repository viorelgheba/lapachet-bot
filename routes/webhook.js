var express = require('express');
var router = express.Router();
var Webhook = require('../services/webhookService');
const FacebookService = require('../services/facebookService');

/* GET webhook page. */
router.get('/', function (req, res) {
    var hook = new Webhook();
    res.send(hook.verify(req));
});

router.post('/', function (req, res) {
    var facebookService = new FacebookService();
    var data = req.body;
    console.log(JSON.stringify(data));

    if (data.object == 'page') {
        data.entry.forEach(function (pageEntry) {
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;

            // Iterate over each messaging event
            pageEntry.messaging.forEach(function (messagingEvent) {
                if (messagingEvent.message) {
                    facebookService.sendTextMessage(messagingEvent.sender.id, messagingEvent.message.text);
                }
                /*if (messagingEvent.optin) {
                    receivedAuthentication(messagingEvent);
                } else if (messagingEvent.message) {
                    receivedMessage(messagingEvent);
                } else if (messagingEvent.delivery) {
                    receivedDeliveryConfirmation(messagingEvent);
                } else if (messagingEvent.postback) {
                    receivedPostback(messagingEvent);
                } else {
                    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
                }*/
            });
        });

        res.sendStatus(200);
    }
});

module.exports = router;
