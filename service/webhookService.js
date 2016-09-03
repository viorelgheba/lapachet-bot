var Wehhook = Webhook.prototype;

function Webhook(request) {
    this._request = request;
}

Webhook.verify = function (token) {
    var requestToken = this._request.query(['hub.verify_token']);
    var challenge = this._request.query(['hub.challenge']);

    if (token === requestToken) {
        return challenge;
    }

    return "Invalid verify token!";
};

module.exports = Webhook;