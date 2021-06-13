/* eslint-disable no-param-reassign */

function removeDebugInfo() {
  return (files, metalsmith, done) => {
    Object.entries(files)
      .filter(entry => entry[1].debug)
      .forEach(([fileName]) => {
        delete files[fileName].debug;
      });
    done();
  };
}

module.exports = removeDebugInfo;
