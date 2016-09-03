'use strict';

function ResponsePayload() {
    this._payload = {
        data: {},
        type: "categories"
    };
}

ResponsePayload.prototype = {
    getPayload: function () {

        return this._payload;
    },
    setPayload: function (payload) {
        this._payload = payload;

        return this;
    },
    getType: function () {
        return this._payload.type;
    },
    getData: function () {
        return this._payload.data;
    },
    setType: function (type) {
        this._payload.type = type;

        return this;
    },
    setData: function (data) {
        this._payload.data = data;

        return this;
    }
};

/**
 * @returns {ResponsePayload}
 */
module.exports.getInstance = function () {
    return new ResponsePayload();
};
