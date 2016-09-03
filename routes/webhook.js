'use strict';

var express = require('express');
var router = express.Router();
var webHook = require('../services/webhookService').getInstance();
var apiService = require('../services/apiService').getInstance();

/* GET webhook page. */
router.get('/', function (req, res) {
    res.send(webHook.verify(req));
});

router.post('/', function (req, res) {
    webHook.handle(req);
    res.sendStatus(200);
});

router.get('/test-api-calls', function (req, res) {
    res.send(apiService.getProductCategories());
});

module.exports = router;
