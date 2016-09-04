$(document).ready(function () {

    var apiService = require('../../services/apiService').getInstance();

    test("test get products by date", 3, function () {
        ok(apiService.getSellingProducts());
    })
});