'use strict';

var request = require('request');

const API_HOST = process.env.UI_API_URL;
const PRODUCTS_URL = '/products/{date}';
const MENU_URL = '/menus/{date}';
const CATEGORIES_URL = '/categories/daily?date={date}';

const HTTP_REQUEST_GET = 'GET';
const HTTP_REQUEST_POST = 'POST';

function ApiService() {
}

ApiService.prototype = {
    getSellingProducts: function (date) {
        return [
            {
                id: 1,
                name: "Produs 1",
                title: "Titlu produs 1"
            },
            {
                id: 2,
                name: "Produs 2",
                title: "Titlu produs 2"
            },
            {
                id: 3,
                name: "Produs 3",
                title: "Titlu produs 3"
            }
        ];
        var url = PRODUCTS_URL.replace('{data}', date);

        return this.request(url, HTTP_REQUEST_GET);
    },
    getProduct: function (id) {
        return {
            id: 1,
            name: "Produs 1",
            title: "Titlu produs 1"
        };
    },
    getSellingMenus: function (date) {
        var url = MENU_URL.replace('{data}', date);

        return this.request(url, HTTP_REQUEST_GET);
    },
    getSellingProductCategories: function () {
        var date = new Date().toISOString().replace(/T.+/, ' ');
        console.info("Today date: ", date);
        var url = CATEGORIES_URL.replace('{date}', date);

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
            console.info("API CALL TO: ", this.getUrl(url));
            if (!error && response.statusCode === 200) {
                return body;
            } else {
                console.error(error);
            }
        });
    }
};

module.exports.getInstance = function () {
    return new ApiService();
};