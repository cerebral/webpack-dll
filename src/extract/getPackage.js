var utils = require('../utils');
var semver = require('semver');
var request = require('request');
var zlib = require('zlib');
var path = require('path');
var tar = require('tar');

module.exports = function getPackage(options) {
  var package = options.package;
  var packageGetUri = utils.getPackageUri(package);
  var tgzUri = utils.getTgzUri(package);
  var registryURL = options.options.registry;

  return new Promise(function (resolve, reject) {
    request(registryURL + packageGetUri, function (err, response) {
      if (err) {
        return reject();
      }

      var data = JSON.parse(response.body);
      var version = options.version;
      var verifiedVersion = semver.maxSatisfying(Object.keys(data.versions), version);

      if (!data.versions[verifiedVersion]) {
        return reject('No valid version, ' + verifiedVersion + ', on package ' + package);
      }

      var dependencies = data.versions[verifiedVersion].dependencies || {};
      var defaultTgzUrl = data.versions[verifiedVersion].dist ? data.versions[verifiedVersion].dist.tarball : null;
      var fallbackTgzUrl = (
        registryURL +
        package + '/-/' +
        tgzUri + '-' + verifiedVersion + '.tgz'
      );
      var read = request(defaultTgzUrl || fallbackTgzUrl);
      var unzip = zlib.createGunzip({
        path: utils.createAbsolutePath(path.resolve(options.tempPath, 'unzip'), path.resolve(options.memoryPath, package)),
        strip: 0
      });
      var extract = tar.Extract({
        path: utils.createAbsolutePath(options.tempPath, path.resolve(options.memoryPath, package)),
        strip: 0
      });

      read.pipe(unzip);
      unzip.pipe(extract);

      extract.on('finish', function (err) {
        if (err) {
          return reject();
        }
        resolve({
          data: data,
          dependencies: dependencies
        });
      });
    });
  });
}
