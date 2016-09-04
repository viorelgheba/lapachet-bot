'use strict';

var request = require('sync-request');

//de modificat
//const API_HOST = process.env.UI_API_URL;
const API_HOST = 'https://lapachet-app.herokuapp.com/api';
const PRODUCTS_URL = '/category_products?date={date}&categoryId={categoryId}';
const PRODUCT_URL = '/products/{productId}';
const MENU_URL = '/products_menus?date={date}';
const CATEGORIES_URL = '/categories/daily?date={date}';
const INTERVALS_URL = '/intervals?date={date}';
const SUBSCRIBE_USER_URL = '/users';
const REGISTER_ORDER_URL = '/sales';

const HTTP_REQUEST_GET = 'GET';
const HTTP_REQUEST_POST = 'POST';

function ApiService() {
}

ApiService.prototype = {
    getSellingProducts: function (categoryId) {
        var date = new Date().toISOString().replace(/T.+/, '');
        var url = PRODUCTS_URL.replace('{date}', date);
        url = url.replace('{categoryId}', categoryId);

        return this.request(HTTP_REQUEST_GET, url);
    },
    getProduct: function (productId) {
        var url = PRODUCT_URL.replace('{productId}', productId);

        return this.request(HTTP_REQUEST_GET, url);
    },
    getSellingMenus: function (date) {
        var url = MENU_URL.replace('{date}', date);

        return this.request(HTTP_REQUEST_GET, url);
    },
    getSellingProductCategories: function () {
        var date = new Date().toISOString().replace(/T.+/, '');
        var url = CATEGORIES_URL.replace('{date}', date);

        return this.request(HTTP_REQUEST_GET, url);
    },
    getIntervals: function () {
        var date = new Date().toISOString().replace(/T.+/, '');
        var url = INTERVALS_URL.replace('{date}', date);

        return this.request(HTTP_REQUEST_GET, url);
    },
    getUrl: function (url) {
        return API_HOST + url;
    },
    request: function (method, url, options) {

        var requestUrl = this.getUrl(url);
        var res = request(method, requestUrl, options);

        console.info("API CALL: ", requestUrl);
        console.info("XXXXXXXXXXXX ", res.body);
        return JSON.parse(res.body.toString('utf-8'));
    },
    registerOrder: function (productId, intervalId, userId) {
        var date = new Date().toISOString().replace(/T.+/, '');
        return this.request(
            HTTP_REQUEST_POST,
            this.getUrl(REGISTER_ORDER_URL),
            {
                json: {
                    userId: userId,
                    productId: productId,
                    intervalId: intervalId,
                    date: date
                }
            }
        );
    }
};

module.exports.getInstance = function () {
    return new ApiService();
};