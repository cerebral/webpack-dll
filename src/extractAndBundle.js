  var memoryFs = require('./memoryFs');
var utils = require('./utils');
var path = require('path');
var resolveEntries = require('./resolveEntries');
var bundle = require('./bundle');
var cleaner = require('./cleaner');
var vendorsQueue = require('./vendorsQueue');
var requestQueue = require('./requestQueue');
var extract = require('./extract');
var preloadPackages = require('./preloadPackages');

preloadPackages([
  // Core node
  'process',

  // Webpack
  'webpack',
  'node-pre-gyp',
  'nopt',
  'rc',
  'tar-pack',

  // Loaders
  'json-loader'
]);

module.exports = function extractAndBundle (file) {
  return function (req, res) {
    var packages = utils.convertPackagesParamToObject(req.params.packages);
    var vendorsBundleName = utils.getVendorsBundleName(packages);
    var existingQueueId = vendorsQueue.getQueueIdByVendorsBundleName(vendorsBundleName);

    if (existingQueueId) {
      requestQueue.add(existingQueueId, file, res);

      return;
    }

    var queueId = vendorsQueue.add(vendorsBundleName);
    requestQueue.add(queueId, file, res);

    Promise.all(Object.keys(packages).map(function (key) {
      console.log('Extracting package ' + key);
      return extract({
        package: key,
        targetFs: memoryFs.fs,
        version: packages[key],
        allPackages: Object.keys(packages),
        options: {
          registry: 'http://registry.npmjs.org/',
          mindelay: 5000,
          maxDelay: 10000,
          retries: 5,
          factor: 5
        },
        tempPath: path.resolve('temp'),
        memoryPath: '/queues/' + queueId + '/node_modules'
      });
    }))
    .then(resolveEntries(packages))
    .then(bundle({
        queueId: queueId,
        targetFs: memoryFs.fs
    }))
    .then(cleaner.add({
        queueId: queueId,
        targetFs: memoryFs.fs
    }))
    .then(function (bundle) {
      requestQueue.resolveManifest(queueId, bundle);
      requestQueue.resolveDll(queueId, bundle);
    })
    .catch(function (err) {
      requestQueue.reject(file, queueId, err);
    });
  }
}
