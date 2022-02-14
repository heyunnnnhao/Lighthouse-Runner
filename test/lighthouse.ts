/* lighthouse 测试 */
import LighthouseRunner, { RunnerConfig, RunnerOption, RunnerResponse } from '../dist/src/index';
import { makeJson } from '../src/utils';

const mockUrl = 'https://www.example.com';

const times = 2;

const options: RunnerOption = {
  mode: 'async',
};

new LighthouseRunner(mockUrl)
  .run(times, options)
  .then((res: RunnerResponse) => {
    if (!res) return;

    console.log(res.description);

    makeJson(res, './results/', 'report.json');

    return res;
  })
  .catch((error) => {
    throw Error(`lighthouseRunner error: ${error}`);
  });
