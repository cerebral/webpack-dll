var hash = require('string-hash');
var path = require('path');

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
    console.log(queuePath, baseEntry);
    var basePath = path.dirname(baseEntry.substr(2));

    return [basePath].reduce(function (allFiles, entryPath) {
      return allFiles.concat(fs.readdirSync(path.join(queuePath, entryPath)).filter(function (file) {
        return (path.extname(file) === '.js' || path.extname(file) === '.css') && file !== path.basename(baseEntry);
      }).map(function (file) {
        return path.join(entryPath.substr(13), file);
      }));
    }, []);
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
  createExternals: function (manifest, entries) {
    return Object.keys(entries).reduce(function (externals, packageName) {
      return Object.keys(manifest.content).reduce(function (externals, manifestKey) {
        var absolutePath = manifestKey.substr(1);

        if (absolutePath.indexOf(packageName) === -1) {
          return externals;
        }

        var basePath = path.dirname(entries[packageName].path.substr(1));
        var fileName = path.basename(absolutePath);
        var extension = path.extname(fileName);
        var replacer = new RegExp('\/' + fileName + '$');

        if (entries[packageName].path.substr(1) === absolutePath) {
          absolutePath = absolutePath.replace(replacer, '');
        } else if (extension === '.js') {
          absolutePath = absolutePath.replace(replacer, '/' + fileName.replace(extension, ''));
        }
        externals[absolutePath.replace(basePath, packageName)] = manifest.name + '(' + manifest.content[manifestKey] + ')';

        return externals;
      }, externals);

    }, {});
  }
};
