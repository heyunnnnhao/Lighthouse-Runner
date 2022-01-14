/* lighthouse 测试 */
import * as fs from 'fs';
import LighthouseRunner from '../src';
import { LighthouseResponse } from '../src/interfaces';

export function makeJson(data: any, folderName: string, fileName: string) {
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

const mockUrl = 'https://www.example.com/';

const times = 3;

new LighthouseRunner(mockUrl).run(times).then((res: LighthouseResponse) => {
  if (res.timesRun === res.successfulRun) {
    console.log(`All ${res.timesRun} run${res.timesRun === 1 ? '' : 's'} ha${res.timesRun === 1 ? 's' : 've'} passed with the score of ${res.score.value}`);
  } else {
    console.log(`${res.timesRun - res.successfulRun} of the ${res.timesRun} runs have failed`);
  }
  makeJson(res, '../results/', 'report.json');
});
