var extractPackages = require('./extractPackages');
var cleanAndResolvePackages = require('./cleanAndResolvePackages');

module.exports = function (options) {
  return extractPackages(options)
    .then(cleanAndResolvePackages(options))
    .catch(function (err) {
      throw err;
    });
};
