var express = require('express');
var router = express.Router();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

/* GET webhook page. */
router.get('/', function (req, res, next) {
    var Webhook = require('./webhook');
    res.send(Webhook.verify(req, VERIFY_TOKEN));
});

module.exports = router;
