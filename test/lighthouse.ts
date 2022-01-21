/* lighthouse 测试 */
import LighthouseRunner from '../src';
import { LighthouseResponse, RunningOptions } from '../src/interfaces';
import { makeJson } from '../src/utils';

const mockUrl = 'https://www.example.com/';

const times = 3;

const options: RunningOptions = {
  mode: 'async',
};

new LighthouseRunner(mockUrl)
  .run(times, options)
  .then((res: LighthouseResponse) => {
    if (!res) return;

    makeJson(res, './results/', 'report.json');

    console.log('\n' + res.description);

    return res;
  })
  .catch((error) => {
    throw Error(`lighthouseRunner error: ${error}`);
  });
