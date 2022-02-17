/* lighthouse 测试 */
import LighthouseRunner, { RunnerConfig, RunnerOption, RunnerResponse } from '../dist/src/index';
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

const mockUrl = 'https://h5.m.jd.com/babelDiy/Zeus/2iJ33Thj52Mfb4fmgytVSBhkLn2i/index.html';

const times = 1;

const options: RunnerOption = {
  mode: 'async',
};

const configs: RunnerConfig = {
  performance: {},
  compliance: {},
  security: {},
};

new LighthouseRunner(mockUrl)
  .run(times, options, configs)
  .then((res: RunnerResponse) => {
    if (!res) return;
    makeJson(res, './results/', 'report.json');

    console.log(res.description);

    // makeJson(res, './results/', 'report.json');

    return res;
  })
  .catch((error) => {
    throw Error(`lighthouseRunner error: ${error}`);
  });
