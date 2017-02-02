var path = require('path')

module.exports = function (fs) {
  function isValidFile (file, content, packageName) {
    return (
      (path.extname(file) === '.js' || path.extname(file) === '.css') &&
      file[0] !== '_' &&
      file.indexOf('.min.js') === -1 &&
      file.indexOf('-min.js') === -1 &&
      file.indexOf('.test.js') === -1 &&
      file.indexOf('.spec.js') === -1 &&
      (
        (encodeURI(content).split(/%..|./).length - 1) < 102400 ||
        file === 'index.js' ||
        file === packageName + '.js'
      )
    );
  }

  var invalidDirs = [
    'dist',
    'es6',
    'es',
    'src',
    'bundles',
    'examples',
    'scripts',
    'tests',
    'testing',
    'min',
    'node_modules'
  ];

  function isValidDir (dir) {
    return invalidDirs.indexOf(dir) === -1;
  }

  return function readPackage (packageName, filePath) {
    return fs.readdirSync(filePath).reduce(function (allFilePaths, fileOrDir) {
      var currentPath = path.join(filePath, fileOrDir);
      var fileStat = fs.statSync(currentPath);

      if (fileStat.isDirectory() && isValidDir(fileOrDir)) {
        return allFilePaths.concat(readPackage(packageName, currentPath));
      } else if (!fileStat.isDirectory() && isValidFile(fileOrDir, fs.readFileSync(currentPath).toString(), packageName)) {
        return allFilePaths.concat(currentPath);
      }

      return allFilePaths;
    }, [])
  }
};
