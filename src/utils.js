var hash = require('string-hash');
var path = require('path');
var findEntryPoints = require('./findEntryPoints');

module.exports = {
  isProduction: function () {
    return process.env.NODE_ENV === 'production';
  },

  convertPackagesParamToObject: function (params) {
    return params.split('+').reduce(function (currentPackages, package) {
      var packageArray = package.split('@');

      currentPackages[packageArray[0]] = packageArray[1];

      return currentPackages;
    }, {})
  },
  createAbsolutePath: function (absolute, relative) {
    var absolutePath = path.join(absolute, path.resolve(relative).replace(path.resolve(), ''));

    return absolutePath;
  },
  getPackageUri: function (package) {
    return package[0] === '@' ? '@' + encodeURIComponent(package.substr(1)) : package;
  },
  getTgzUri: function (package) {
    return package.split('/')[package.split('/').length - 1];
  },
  getUniqueDependencies: function (allPackages, dependencies) {
    return Object.keys(dependencies).reduce(function (uniqueDependencies, key) {
      if (allPackages.indexOf(key) === -1) {
        uniqueDependencies[key] = dependencies[key];
      }

      return uniqueDependencies;
    }, {});
  },
  findEntryPoints: function (fs, entryKey, queuePath, baseEntry) {
    var filePath = path.join(queuePath, path.dirname(baseEntry.substr(2)));
    var entries = findEntryPoints(fs)(entryKey, filePath);

    require('fs').writeFileSync('entries.js', JSON.stringify(entries, null, 2));
    return entries;
  },
  getVendorsBundleName: function (packages) {
    if (!packages || Object.keys(packages).length === 0) {
      return null;
    }
    var packagesList = Object.keys(packages).map(function (key) {
      return key + ':' + packages[key];
    }).sort(function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return String(hash(JSON.stringify(packagesList)));
  },
  logError: function (err) {
    console.log(err.message);
    console.log(err.stack);
  },
  cleanManifest: function (manifest, entries) {
    var entryPaths = Object.keys(entries).reduce(function (currentEntryPaths, entryKey) {
      return currentEntryPaths.concat(entries[entryKey].path.substr(1));
    }, []);

    return {
      name: manifest.name,
      content: Object.keys(manifest.content).reduce(function (currentManifest, key) {
        if (
          path.basename(key)[0] !== '_' &&
          key.substr(0, 8) === './queues' &&
          key.match(/node_modules/).length === 1
        ) {
          var isEntryMatch = Boolean(entryPaths.filter(function (entryPath) {
            return key.indexOf(entryPath) >= 0;
          }).pop());

          var pathParts = key.split('/')
          var pathKey = isEntryMatch ? './' + pathParts.reduce(function (currentPath, part, index) {
            if (part === 'node_modules') {
              return path.join(currentPath, part, pathParts[index + 1])
            } else if (currentPath.indexOf('node_modules') === -1) {
              return path.join(currentPath, part)
            }

            return currentPath
          }, '') : key

          currentManifest[pathKey] = manifest.content[key];
        }

        return currentManifest;
      }, {})
    }
  }
};
