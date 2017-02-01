var usage = require('usage');

module.exports = {
  get: function (req, res) {
    var pid = process.pid;
    var options = { keepHistory: true }
    usage.lookup(pid, options, function(err, result) {
      if (err) {
        return res.sendStatus(500);
      }
      res.send({
        memory: result
      });
    });
  }
}
