const fs = require('fs');

function makeJson(data, folderName, fileName) {
  try {
    const resultJson = JSON.stringify(data);
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    fs.writeFileSync(folderName + Date.now() + fileName, resultJson);
  } catch (e) {
    console.log('make Json failed');
  }
}

function formatTime(time) {
  return new Date(time).toLocaleString('zh-CN');
}

module.exports = { makeJson, formatTime };
