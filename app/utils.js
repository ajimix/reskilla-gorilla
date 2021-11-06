const fs = require('fs');
const path = require('path');

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

module.exports = {
  rootRequire,
  filesInFolderSync,
};
