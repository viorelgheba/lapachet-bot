var request = require('request');

const API_HOST = 'https://lapachet-bot.herokuapp.com';

function ApiService() {
}

ApiService.prototype = {
    getProductsByDate: function (date) {

    },
    getDaliyMenusByDate: function (date) {

    },
    getUrl: function (url) {
        return API_HOST + url;
    },
    request: function (url, method) {
        var options = {
            url: this.getUrl(url),
            port: 80,
            method: method
        };
        request(this.getUrl(url), options, this.processResponse(error, response, body));
    },
    processResponse: function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            return body;
        }
    }
};

module.exports.ApiService = ApiService;
