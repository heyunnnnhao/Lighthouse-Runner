import * as fs from 'fs';

export function makeJson(data, folderName, fileName) {
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

export function formatTime(time) {
  return new Date(time).toLocaleString('zh-CN');
}
