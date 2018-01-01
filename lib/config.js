module.exports = path => {
  const def = {
    dateFormat: 'MMMM Do YYYY'
  };

  let config = {};

  if (path != null) {
    config = require(path);
  }

  return Object.assign(def, config);
};
