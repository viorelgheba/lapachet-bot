'use strict';

var request = require('request');

const API_HOST = process.env.UI_API_URL;
const PRODUCTS_URL = '/products/{date}';
const MENU_URL = '/menus/{date}';

const HTTP_REQUEST_GET = 'GET';
const HTTP_REQUEST_POST = 'POST';

function ApiService() {
}

ApiService.prototype = {
    getProductsByDate: function (date) {
        var url = PRODUCTS_URL.replace('{data}', date);

        return this.request(url, HTTP_REQUEST_GET);
    },
    getMenusByDate: function (date) {
        var url = MENU_URL.replace('{data}', date);

        return this.request(url, HTTP_REQUEST_GET);
    },
    getUrl: function (url) {
        return API_HOST + url;
    },
    request: function (url, method) {
        var options = {
            port: 80,
            method: method
        };
        request(this.getUrl(url), options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                return body;
            } else {
                console.log(error);
            }
        });
    }
};

module.exports.ApiService = ApiService;
