'use strict';

var request = require('sync-request');

//de modificat
//const API_HOST = process.env.UI_API_URL;
const API_HOST = 'https://lapachet-app.herokuapp.com/api';
const PRODUCTS_URL = '/products/{date}';
const MENU_URL = '/menus/{date}';
const CATEGORIES_URL = '/categories/daily?date={date}';
const INTERVALS_URL = '/categories/intervals';

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
        var url = CATEGORIES_URL.replace('{date}', date);

        return this.request(HTTP_REQUEST_GET, url);
    },
    getIntervals: function () {

        return [
            {
                id: 1,
                start: 19,
                end: 20
            },
            {
                id: 2,
                start: 20,
                end: 21
            },
            {
                id: 3,
                start: 21,
                end: 22
            },
            {
                id: 4,
                start: 22,
                end: 23
            }
        ];
        return this.request(INTERVALS_URL, HTTP_REQUEST_GET);
    },
    getUrl: function (url) {
        return API_HOST + url;
    },
    request: function (method, url) {

        var requestUrl = this.getUrl(url);
        var res = request(HTTP_REQUEST_GET, requestUrl);
        console.log(requestUrl);
        return JSON.parse(res.body.toString('utf-8'));
    }
};

module.exports.getInstance = function () {
    return new ApiService();
};