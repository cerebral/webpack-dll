var path = require('path');
var utils = require('./utils');

module.exports = function (packages) {
  return function (packagesData) {
    var entries = packagesData.reduce(function (entries, packageData) {
      var packageEntry = packageData.main || 'index.js';

      if (typeof packageData.browser === 'string') {
        packageEntry = packageData.browser;
      }

      if (packageData.browser && packageData.browser[packageData.main]) {
        packageEntry = packageData.browser[packageData.main];
      }

      if (!path.extname(packageEntry)) {
        packageEntry += '.js';
      }

      entries[packageData.name] = {
        path: '.' + path.resolve('/', 'node_modules', packageData.name, packageEntry),
        isBrowserEntry: Boolean(packageData.browser)
      };

      return entries;
    }, {});

    return {
      name: utils.getVendorsBundleName(packages),
      entries: entries,
      packages: packages
    };
  }
}
