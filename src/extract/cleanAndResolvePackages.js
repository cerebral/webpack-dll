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
      var main = data.versions[version].main;
      var browser = data.versions[version].browser;
      var module = data.versions[version].module;
      var unpkg = data.versions[version].unpkg;
      var mainEntry;

      if (!utils.isPrebundledFile(unpkg)) {
        mainEntry = unpkg;
      } else if (!utils.isPrebundledFile(main)) {
        mainEntry = main;
      } else if (browser && !utils.isPrebundledFile(browser)) {
        mainEntry = browser;
      } else if (module && !utils.isPrebundledFile(module)) {
        mainEntry = module;
      }

      return {
        name: data.name,
        version: version,
        main: mainEntry,
        isPrebundled: utils.isPrebundledFile(mainEntry)
      };
    });
  }
}
