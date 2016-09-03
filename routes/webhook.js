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
    var events = req.body.entry[0].messaging,
        facebookService = new FacebookService();

    for (var i = 0; i < events.length; i++) {
        var event = events[i];

        if (event.message && event.message.text) {
            facebookService.sendTextMessage(event.sender.id, event.message.text);
        } else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback));
        }

        res.sendStatus(200);
    }
});

module.exports = router;
