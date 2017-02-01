var MemoryFileSystem = require("memory-fs");

module.exports = {
  fs: new MemoryFileSystem()
};
