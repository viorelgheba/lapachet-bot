var express = require('express');
var router = express.Router();
var webHook = require('../services/webhookService').getInstance();
var apiService = require('../services/apiService');

/* GET webhook page. */
router.get('/', function (req, res) {
    res.send(webHook.verify(req));
});

router.post('/', function (req, res) {
    webHook.handle(req);
    res.sendStatus(200);
});

router.get('/test-api-calls', function (req, res) {
    var api = new apiService.ApiService();
    res.send(api.request('/test-request/', 'GET'));
});

module.exports = router;
