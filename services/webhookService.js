var request = require('request');


function WebHookService() {
}

WebHookService.prototype = {
    verify: function (req) {
        var token = req.query['hub.verify_token'];
        var challenge = req.query['hub.challenge'];

        if (token === process.env.VERIFY_TOKEN) {
            return challenge;
        }

        return "Invalid token received!";
    },
    handle: function (req) {
        // TODO factory to handle bot received data
    }

};

module.exports.WebHookService = WebHookService;
