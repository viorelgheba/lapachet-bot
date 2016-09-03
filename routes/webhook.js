var express = require('express');
var router = express.Router();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

/* GET webhook page. */
router.get('/', function (req, res) {
    var Webhook = require('../service/webhookService');
    var hook = new Webhook();

    res.send(hook.verify(req));
});

module.exports = router;
