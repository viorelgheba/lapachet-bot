'use strict';

var express = require('express');
var router = express.Router();
var apiService = require('../services/apiService').getInstance();
var facebookApi = require('../services/facebookService').getInstance();

router.post('/', function (req, res) {
    var access_token = req.query['access_token'];
    if (access_token != process.env.API_TOKEN) {
        res.send("Invalid token!");
    }
    var users = req.query['users'];

    users.forEach(function (user) {
        console.log("Sending Message to userId: " + user);

        facebookApi.sendMessage(user, "We got food suply :), please use this bot Menu");
    })
});

module.exports = router;
