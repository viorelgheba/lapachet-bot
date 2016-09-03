var express = require('express');
var router = express.Router();
var webhook = require('../services/webhookService');

/* GET webhook page. */
router.get('/', function (req, res) {
    var WebHookService = new webhook.WebHookService();
    res.send(WebHookService.verify(req));
});

module.exports = router;
