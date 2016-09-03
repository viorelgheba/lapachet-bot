var express = require('express');
var router = express.Router();
var Webhook = require('../services/webhookService');

/* GET webhook page. */
router.get('/', function (req, res) {
    var hook = new Webhook();
    res.send(hook.verify(req));
});

router.post('/', function (req, res) {
    console.log(req.body);
    res.send("test");
});

module.exports = router;
