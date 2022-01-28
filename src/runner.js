const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const config = require('./configs/config-override');
const { formatLighthouseResponse } = require('./format');

function chromeOptions() {
  return {
    chromeFlags: ['--headless', '--disable-gpu', '--enable-automation', '--disable-device-discovery-notifications', '--disable-sync'],
  };
}

module.exports = async function runLH(url) {
  let chrome, rawResult;

  try {
    chrome = await chromeLauncher.launch(chromeOptions());
  } catch (error) {
    throw Error('启动 chrome 失败 ' + error);
  }

  try {
    console.log(`正在运行 lighthouse 于端口: ${chrome.port} - ${new Date().toLocaleString('zh-CN')}`);
    rawResult = await lighthouse(url, { port: chrome.port }, config);
  } catch (error) {
    throw Error('运行 lighthouse 失败 ' + error);
  }

  try {
    await chrome.kill();
  } catch (error) {
    throw Error('关闭 chrome 失败 ' + error);
  }

  return formatLighthouseResponse(rawResult);
};
