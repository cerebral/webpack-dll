var path = require('path');
var utils = require('../utils');
var getPackage = require('./getPackage');
var writePackage = require('./writePackage');

module.exports = function extractPackages (options) {
  return getPackage(options)
    .then(writePackage(options))
    .then(function (result) {
      var dependencies = utils.getUniqueDependencies(options.allPackages, result.dependencies);

      options.allPackages = options.allPackages.concat(Object.keys(dependencies));

      return Promise.all(Object.keys(dependencies).map(function (key) {
        return extractPackages(Object.assign({}, options, {
          package: key,
          version: dependencies[key],
          memoryPath: path.join(options.memoryPath, options.package, 'package', 'node_modules')
        }));
      }))
      .then(function () {
        return result.data;
      });
    })
};
