var express = require('express');
var router = express.Router();
var webhook = require('../services/webhookService');
var facebook = require('../services/facebookService');
var apiService = require('../services/apiService');

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
                    facebookService.sendTextMessage(messagingEvent.sender.id, messagingEvent.message.text);
                } else if (messagingEvent.delivery) {
                    //receivedDeliveryConfirmation(messagingEvent);
                } else if (messagingEvent.postback) {
                    console.info(JSON.stringify(messagingEvent));
                    facebookService.sendTextMessage(messagingEvent.sender.id, "Postback test");
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

router.get('/test-api-calls', function (req, res) {
    var api = new apiService.ApiService();

    res.send(api.request('/test-request/', 'GET'));
});

module.exports = router;
