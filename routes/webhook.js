var express = require('express');
var router = express.Router();

/* GET webhook page. */
router.get('/', function (req, res) {
    var Webhook = require('../services/webhookService');
    var hook = new Webhook();

    res.send(hook.verify(req));
});

module.exports = router;
