'use strict';

var express = require('express');
var router = express.Router();
var apiService = require('../services/apiService').getInstance();

router.post('/', function (req, res) {
    console.log(JSON.stringify(req));
    res.send("Ok");
});

module.exports = router;
