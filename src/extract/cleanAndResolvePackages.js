var path = require('path');
var semver = require('semver');
var rmdir = require('rmdir');
var utils= require('../utils');

module.exports = function (options) {
  return function (data) {
    return new Promise(function (resolve, reject) {
      rmdir(utils.createAbsolutePath(options.tempPath, path.resolve(options.memoryPath, options.package)), function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    })
    .then(function () {
      var version = semver.maxSatisfying(Object.keys(data.versions), options.version);
      return {
        name: data.name,
        version: version,
        main: data.versions[version].main,
        browser: data.versions[version].browser
      };
    });
  }
}
