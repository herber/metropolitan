const globby = require('globby');

exports.markdown = async path => {
  return await globby(['**/**.md', '**/**.markdown'], { cwd: path });
};

exports.ejs = async path => {
  return await globby(['**/**.ejs', '!post.ejs', '!404.ejs'], { cwd: path });
};
