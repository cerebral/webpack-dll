var config = require(`../configs/${process.env.WEBPACK_DLL_ENV}.json`);
var path = require('path');
var queue = {};
var utils = require('./utils');
var request = require('request');
var errors = require('./errors');

module.exports = {
  add: function (id, packages, file, res) {
    if (queue[id])  {
      queue[id][file].push(res);
    } else {
      queue[id] = {'dll.js': [], 'manifest.json': [], bundle: null};

      queue[id][file].push(res);

      var requeustQueue = this;
      return this.getBundle(Date.now(), config.packagerServiceUrls[0], packages)
        .then(function (bundle) {
          requeustQueue.resolveFiles(id, bundle);

          return bundle;
        })
    }
  },
  getBundle (initialRequestTime, host, packages) {
    var timePassed = Date.now() - initialRequestTime;
    var requestQueue = this;

    if (timePassed > config.packageServicesTimeout) {
      throw new Error('PACKAGES_TIMEOUT');
    }

    return new Promise(function (resolve, reject) {
      request({
        url: host + '/' + packages,
        timeout: config.packageServiceTimeout
      }, function (err, response, body) {
        if (err) {
          reject(err);

          return;
        }

        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(body));
        }
      })
    })
      .catch(function (error) {
        if (error.code === 'ESOCKETTIMEDOUT' || error.message === 'Service Unavailable') {
          var nextHost = config.packagerServiceUrls[config.packagerServiceUrls.indexOf(host) + 1];
          nextHost = nextHost || config.packagerServiceUrls[0];

          return requestQueue.getBundle(initialRequestTime, nextHost, packages);
        }

        throw error;
      })
  },
  has: function (id) {
    return Boolean(queue[id]);
  },
  remove: function (id) {
    delete queue[id];
  },
  resolveFiles (id, bundle) {
    this.resolveManifest(id, bundle.manifest);
    this.resolveDll(id, bundle.dll);

    delete queue[id];
  },
  resolveDll: function (id, content) {
    var requests = queue[id]['dll.js'];

    requests.forEach(utils.sendFile('dll.js', content))
  },
  resolveManifest: function (id, content) {
    var requests = queue[id]['manifest.json'];

    requests.forEach(utils.sendFile('manifest.json', content));
  },
  reject: function (id, err) {
    var requests = queue[id]['dll.js'].concat(queue[id]['manifest.json']);

    requests.forEach(function (res) {
      try {
        res.status(500).send(err.message);
      } catch (e) {}
    })

    delete queue[id];
  }
}
