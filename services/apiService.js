'use strict';

var request = require('request');

const API_HOST = process.env.UI_API_URL;
const PRODUCTS_URL = '/products/{date}';
const MENU_URL = '/menus/{date}';
const CATEGORIES_URL = '/categories';

const HTTP_REQUEST_GET = 'GET';
const HTTP_REQUEST_POST = 'POST';

function ApiService() {
}

ApiService.prototype = {
    getProductsByDate: function (date) {
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
    getMenusByDate: function (date) {
        var url = MENU_URL.replace('{data}', date);

        return this.request(url, HTTP_REQUEST_GET);
    },
    getProductCategories: function () {
        return [
            {
                id: 1,
                name: "categorie 1",
                title: "Blab labla 1"
            },
            {
                id: 2,
                name: "categorie 2",
                title: "Titlu"
            }
        ];
        return this.request(CATEGORIES_URL, HTTP_REQUEST_GET);
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

module.exports.getInstance = function () {
    return new ApiService();
};