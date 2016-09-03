var express = require('express');
var router = express.Router();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

/* GET webhook page. */
router.get('/', function (req, res, next) {

    var Webhook = require('../service/webhookService');
    res.send(Webhook.verify(req, VERIFY_TOKEN));

    // if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    //     res.send(req.query['hub.challenge']);
    // } else {
    //     res.send('Invalid verify token');
    // }
});

module.exports = router;
