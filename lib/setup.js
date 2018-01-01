const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

module.exports = p => {
  if (fs.existsSync(p)) {
    rimraf(p);
  }

  mkdirp.sync(path.join(p, 'public'));
};
