var path = require('path');
var request = require('request');
var rreaddir = require('recursive-readdir');
var utils = require('../utils');
var fs = require('fs');

module.exports = function writePackage(options) {
  return function (result) {
    return new Promise(function (resolve, reject) {
      rreaddir(utils.createAbsolutePath(options.tempPath, path.resolve(options.memoryPath, options.package)), function (err, files) {
        if (err) {
          return reject();
        }
        Promise.all(files.map(function (file) {
          return new Promise(function (resolve, reject) {
            fs.readFile(file, 'utf-8', function (err, content) {
              if (err) {
                reject(err);
              }

              var targetPath = file.replace(options.tempPath, '').replace(/\/package\//g, '/');
              var dirPath = path.dirname(targetPath);

              dirPath.split(path.sep).reduce(function (fullPath, partPath, index) {
                fullPath += (index === 1 ? '' : '/') + partPath;

                if (!options.targetFs.existsSync(fullPath)) {
                  options.targetFs.mkdirSync(fullPath);
                }

                return fullPath;
              }, '');

              options.targetFs.writeFileSync(targetPath, content || ' ');

              resolve();
            });
          });
        }))
          .then(function () {
            resolve(result);
          })
          .catch(reject);
      });
    });
  }
}
