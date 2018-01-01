const fs = require('fs');
const path = require('path');
const verim = require('verim');
const marked = require('marked');
const ejs = require('ejs');
const decamelize = require('decamelize');
const copy = require('recursive-copy');

const text = require('./text');
const { markdown, ejs } = require('./files');
const setup = require('./setup');

module.exports = (p, config) => {
  verim(fs.existsSync(path.join(p, 'views')), 'Views directory missing');
  verim(fs.existsSync(path.join(p, 'docs')), 'Docs directory missing');
  verim(fs.existsSync(path.join(p, 'views/index.ejs')), 'index view missing');
  verim(fs.existsSync(path.join(p, 'views/post.ejs')), 'post view missing');

  const views = markdown(path.join(p, 'views'));
  const md = markdown(path.join(p, 'docs'));

  verim(md.length > 0, 'No markdown files found');

  setup(p);

  const postView = fs.readFileSync(path.join(p, 'views/post.ejs'));

  for (m in md) {
    const stats = fs.stat(md[m]);
    const name = path
      .basename(md[m])
      .replace(/\.[^/.]+$/, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    md[m] = {
      path: md[m],
      file: name,
      name: decamelize(name),
      modified: moment(stats.mtime).format(config.dateFormat)
    };
  }

  // Posts
  md.forEach(m => {
    const content = fs.readFileSync(m.path);
    const stats = fs.stat(m.path);
    const rendered = marked(content);

    const html = ejs.render(postView, {
      path: m.path,
      file: m.file,
      name: m.name,
      modified: m.modified,
      data: rendered
    });

    fs.writeFileSync(path.join(p, `out/${name}/index.html`), html);
  });

  // 404
  let notFound = text.notFound();

  if (fs.existsSync(path.join(p, 'views/404.ejs'))) {
    notFound = fs.readFileSync(path.join(p, 'views/404.ejs'));
  }

  fs.writeFileSync(path.join(p, `out/404.html`), notFound);

  // views
  views.forEach(v => {
    const view = fs.readFileSync(v);

    const html = ejs.render(view, {
      docs: md
    });

    const name = v
      .basename(md[m])
      .replace(/\.[^/.]+$/, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    fs.writeFileSync(path.join(p, `out/${name}/index.html`), html);
  });

  // static
  copy(path.join(p, `static`), path.join(p, `out/`)).catch((err) => {
    throw err;
  });

  // public
  copy(path.join(p, `views/public`), path.join(p, `out/public`)).catch((err) => {
    throw err;
  });
};
