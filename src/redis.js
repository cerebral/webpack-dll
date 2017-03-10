var redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL || null);

client.on('error', function (err) {
  console.log('ERROR: Redis error', err);
})

module.exports = {
  set: function (key, value) {
    return new Promise(function (resolve, reject) {
      client.set(key, value, function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  },
  get: function (key) {
    return new Promise(function (resolve, reject) {
      client.get(key, function (err, value) {
        if (err) {
          return reject(err);
        }

        resolve(value);
      });
    });
  }
}
