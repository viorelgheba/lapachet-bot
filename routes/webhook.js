'use strict';

var express = require('express');
var router = express.Router();
var Webhook = require('../services/webhookService').getInstance();
var apiService = require('../services/apiService').getInstance();

/* GET webhook page. */
router.get('/', function (req, res) {
    res.send(Webhook.verify(req));
});

router.post('/', function (req, res) {
    Webhook.handle(req);
    res.sendStatus(200);
});

module.exports = router;
