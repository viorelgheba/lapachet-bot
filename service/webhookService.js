var method = Webhook.prototype;

function Webhook() {
}

method.verify = function (req) {
    var token = req.query['hub.verify_token'];
    var challenge = req.query['hub.challenge'];

    if (token === process.env.VERIFY_TOKEN) {
        return challenge;
    }

    return "Invalid verify token!";
};

module.exports = Webhook;