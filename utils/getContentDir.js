const fs = require("fs");
const getLocalIP = require("./getLocalIP.js");

const getContentDir = async (path) => {
  try {
    const contentDir = await fs.promises.opendir(path);
    const myIP = await getLocalIP();
    const data = {
      myIP,
      path,
      content: {
        directories: [],
        files: [],
      },
    };
    for await (const dirent of contentDir) {
      if (dirent.isDirectory()) {
        data.content.directories.push(dirent.name);
      } else {
        data.content.files.push(dirent.name);
      }
    }

    return data;
  } catch (error) {
    return "Error: " + error;
  }
};

module.exports = getContentDir;
