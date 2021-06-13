/* eslint-disable no-param-reassign */

function addDebugInfo() {
  return (files, metalsmith, done) => {
    // These keys don't need to stored in the debug info
    const keysToIgnore = [
      'breadcrumb_path',
      'collection',
      'contents',
      'debug',
      'filename',
      'isDrupalPage',
      'layout',
      'modified',
      'nav_children',
      'nav_path',
      'path',
      'private',
    ];

    const filesWithDebug = Object.keys(files)
      .filter(fileName => files[fileName].isDrupalPage)
      .reduce((file, fileName) => {
        file[fileName] = Object.fromEntries(
          Object.entries(files[fileName]).filter(
            key => !keysToIgnore.includes(key[0]),
          ),
        );
        return file;
      }, {});

    metalsmith.metalsmithFiles = filesWithDebug;

    done();
  };
}

module.exports = addDebugInfo;
