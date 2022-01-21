const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
import config from './configs/config-override';
import { formatLighthouseResponse } from './format';

function chromeOptions() {
  return {
    chromeFlags: ['--headless', '--disable-gpu', '--enable-automation', '--disable-device-discovery-notifications', '--disable-sync'],
  };
}

export default async function runLH(url) {
  let chrome, rawResult;

  try {
    chrome = await chromeLauncher.launch(chromeOptions());
  } catch (error) {
    throw Error('启动 chrome 失败 ' + error);
  }

  try {
    console.log(`running lighthouse at port: ${chrome.port}...`);
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
}
