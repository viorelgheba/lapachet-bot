var express = require('express');
var Weebhook = (function _Webhook() {
    var self = Object.create({});

    self.verify = function (request, verifyToken) {
        var token = request.query(['hub.verify_token']);
        var challenge = request.query['hub.challenge'];

        if (token === verifyToken) {
            return challenge
        }

        return "Invalid token received";
    };

    return self;
});