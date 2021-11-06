const fs = require('fs');
const path = require('path');
const pug = require('pug');

/**
 * Function to replace require and always require from root so we don't have to deal with paths.
 * Also supports requiring an entire folder something/* (only requires .js files)
 * @param {string} name
 */
function rootRequire(name) {
  // If file name ends with *, require all files in folder
  if (name.substr(-1) === '*') {
    const files = filesInFolderSync(global.rootPath + '/' + name.substring(0, name.length - 1));
    files.forEach((file) => {
      if ('.js' === file.slice(-3)) {
        require(file);
      }
    });
  } else {
    return require(global.rootPath + '/' + name);
  }
}

/**
 * Returns files in folder synchronously
 * @param {string} folder
 * @returns {array}
 */
function filesInFolderSync(folder) {
  return fs
    .readdirSync(folder)
    .reduce(
      (files, file) =>
        fs.statSync(path.join(folder, file)).isDirectory()
          ? files.concat(filesInFolderSync(path.join(folder, file)))
          : files.concat(path.join(folder, file)),
      []
    );
}

/**
 * Renders the template with Pug
 * @param  {string} viewName View name without extension
 * @param  {object} data
 * @return {string} The HTML code
 */
function renderTemplate(viewName, data) {
  const { isDevelopment } = rootRequire('config/config.js');
  const pugOptions = {
    filters: {
      assetURL: (text) => {
        if (true === isDevelopment) {
          text += `?${Math.ceil(Math.random() * 10000)}`;
        }
        return `/assets/${text}`;
      },
      isDevelopment: () => isDevelopment,
    },
    pretty: isDevelopment,
  };
  const compiledFunction = pug.compileFile(`${global.rootPath}/app/views/${viewName}.pug`, pugOptions);

  data = Object.assign({}, data, pugOptions.filters);

  return compiledFunction(data);
}

module.exports = {
  rootRequire,
  filesInFolderSync,
  renderTemplate,
};
