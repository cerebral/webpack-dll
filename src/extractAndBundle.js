var utils = require('./utils');
var path = require('path');
var requestQueue = require('./requestQueue');
var database = require('./database');

module.exports = function extractAndBundle (file) {
  return function (req, res) {
    var vendorsBundleName = utils.getVendorsBundleName(req.params.packages);

    if (requestQueue.has(vendorsBundleName)) {
      requestQueue.add(vendorsBundleName, req.params.packages, file, res);

      return;
    }

    requestQueue.add(vendorsBundleName, req.params.packages, file, res)
      .then(function (bundle) {
        return Promise.all([
          database.saveFile(vendorsBundleName, 'dll.js', bundle.dll),
          database.saveFile(vendorsBundleName, 'manifest.json', bundle.manifest)
        ])
        .catch(function (err) {
          console.log('ERROR - Could not write to Database', err);
        })
      })
      .catch(function (err) {
        requestQueue.reject(vendorsBundleName, err);
      });
  }
}
