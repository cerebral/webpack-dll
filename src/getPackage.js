const semver = require('semver')
const request = require('request')

function getLatestNpmVersion (versions) {
  function sorter (a, b) {
    if (semver.lt(a, b)) {
      return 1
    }
    if (semver.lt(b, a)) {
      return -1
    }

    return 0
  }

  var versionsList = Object.keys(versions)
  var latestVersion = versionsList.filter(function (version) {
    return version.indexOf('-') === -1
  }).sort(sorter)[0]

  return latestVersion || versionsList[versionsList.length - 1]
}

module.exports = function getPackage (req, res) {
  var nameSplit = req.params.packageName.split('@');

  // If leading @
  if (!nameSplit[0]) {
    nameSplit.shift();
    nameSplit[0] = '@' + encodeURIComponent(nameSplit[0]);
  }

  var name = nameSplit[0];
  var version = nameSplit[1];

  new Promise(function (resolve, reject) {
    request('http://registry.npmjs.org/' + name, function (err, response, body) {
      if (err || response.statusCode < 200  || response.statusCode >= 300) {
        return res.sendStatus(404);
      }

      try {
        var package = JSON.parse(body);
      } catch (e) {
        return reject();
      }

      var validVersion = !version || version in package.versions;
      if (!validVersion) {
        return reject();
      }

      resolve(package);
    });
  })
    .then(function (package) {
      var packageVersion = version || getLatestNpmVersion(package.versions);

      res.send({
        name: package.name,
        version: packageVersion
      });
    })
    .catch(function (err) {
      res.sendStatus(404);
    });
}
