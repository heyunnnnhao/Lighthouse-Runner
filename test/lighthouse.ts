/* lighthouse 测试 */
import LighthouseRunner from '../src';
import { LighthouseResponse } from '../src/interfaces';
import { makeJson } from '../src/utils';

const mockUrl = 'https://www.example.com/';

const times = 3;

new LighthouseRunner(mockUrl)
  .run(times)
  .then((res: LighthouseResponse) => {
    if (res.timesRun === res.successfulRun) {
      console.log(`All ${res.timesRun} run${res.timesRun === 1 ? '' : 's'} ha${res.timesRun === 1 ? 's' : 've'} passed with the score of ${res.score.value}`);
    } else {
      console.log(`${res.timesRun - res.successfulRun} of the ${res.timesRun} runs have failed`);
    }
    makeJson(res, '../results/', 'report.json');
  })
  .catch((error) => {
    return error;
  });

// new LighthouseRunner().test()

// new LighthouseRunner().errorTest();
