var db = require('./mongodb.js');
var memoryFs = require('../memoryFs.js');
var path = require('path');

module.exports = {
  connect: db.connect,
  saveFile: function (bundleName, pathToFile) {
    const fileName = path.basename(pathToFile);

    return db.writeFile(bundleName + '_' + fileName, memoryFs.fs.createReadStream(pathToFile));
  },
  getFile: function (bundleName, fileName, res) {
    return db.readFile(bundleName + '_' + fileName, res);
  },
  fileExists: function (bundleName, fileName) {
    return db.fileExists(bundleName + '_' + fileName)
  }
}
