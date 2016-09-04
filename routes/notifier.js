'use strict';

var express = require('express');
var router = express.Router();
var apiService = require('../services/apiService').getInstance();

router.post('/', function (req, res) {
    console.log(req);
    var access_token = req.query['access_token'];
    if (access_token != process.env.API_TOKEN) {
        res.send("Invalid token!");
    }
});

module.exports = router;
