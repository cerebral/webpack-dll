var config = require(`../configs/${process.env.WEBPACK_DLL_ENV}.json`);
var path = require('path');
var queue = {};
var utils = require('./utils');
var request = require('request');
var errors = require('./errors');

var packagers = config.packagerServiceUrls.map(function (packageServiceUrl) {
  return {
    url: packageServiceUrl,
    isAvailable: true
  }
});

module.exports = {
  add: function (id, packages, file, res) {
    if (queue[id])  {
      queue[id][file].push(res);
    } else {
      queue[id] = {'dll.js': [], 'manifest.json': [], bundle: null};

      queue[id][file].push(res);

      var requeustQueue = this;
      return this.getBundle(packages)
        .then(function (bundle) {
          requeustQueue.resolveFiles(id, bundle);

          return bundle;
        })
    }
  },
  getBundle (packages) {
    var requestQueue = this;

    return new Promise(function (resolve, reject) {
      var availablePackager = packagers.reduce(function (currentPackager, packager) {
        if (currentPackager) {
          return currentPackager;
        }

        if (packager.isAvailable) {
          return packager;
        }

        return currentPackager;
      }, null);

      if (!availablePackager) {
        throw new Error(errors.PACKAGER_NOT_AVAILABLE);
      }

      availablePackager.isAvailable = false;

      request({
        url: availablePackager.url + '/' + packages,
        timeout: config.packageServiceTimeout
      }, function (err, response, body) {
        availablePackager.isAvailable = true;

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
        availablePackager.isAvailable = false;

        requestQueue.getBundle(packages)

        setTimeout(function () {
          availablePackager.isAvailable = true;
        }, 10000)
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
