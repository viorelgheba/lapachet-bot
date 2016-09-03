'use strict';

var redis = require('redis');

function RedisClient(db) {
    this._client = redis.createClient(process.env.REDIS_HOST);
    this._client.select(db);
}

RedisClient.prototype = {
    set: function (key, value, expire) {
        this._client.set(key, value);
        if (expire !== undefined) {
            this._client.expire(key, expire);
        }
    },
    get: function (key) {
        return this._client.get(key);
    }
};

/**
 * @returns {RedisClient}
 */
module.exports.getInstance = function (db) {
    return new RedisClient(db);
};
