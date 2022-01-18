/* lighthouse 测试 */
import LighthouseRunner, { LighthouseResponse, RunningOptions } from '../src';
import { makeJson } from '../src/utils';

const mockUrl = 'https://www.example.com/';

const times = 3;

const options: RunningOptions = {
  mode: 'errortest',
  cheat: false,
};

new LighthouseRunner(mockUrl, options)
  .run(times)
  .then((res: any) => {
    if (!res) return;

    if (res === 200 || res === 0) return res;

    if (res.timesRun === res.successfulRun) {
      console.log(`All ${res.timesRun} run${res.timesRun === 1 ? '' : 's'} ha${res.timesRun === 1 ? 's' : 've'} passed with the score of ${res.score.value}`);
    } else {
      console.log(`${res.timesRun - res.successfulRun} of the ${res.timesRun} runs have failed`);
    }

    makeJson(res, '../results/', 'report.json');

    return res;
  })
  .catch((error) => {
    throw Error(`lighthouse error: ${error}`);
  });
