var fs = require("fs");
var path = require("path");
var child_process = require("child_process");

module.exports = {
  setup: function (work_dir, file_content, cb) {
    var filePath = path.resolve(work_dir, 'main.rs');
    var binPath = path.resolve(work_dir, 'main');
    fs.writeFileSync(filePath, file_content);
    // console.log('g++', [filePath, '-o', binPath]);
    try {
      child_process.execFileSync('rustc', [filePath], {stdio: 'pipe', cwd: path.dirname(filePath)})
    } catch (e) {
      con.throw(e.stack || e.toString());
    }
    fs.chmodSync(binPath, 777)
    cb(binPath);
  },
  execute: function (file_path, cb) {
    var child = child_process.spawn(file_path);
    cb(child);
  }
}