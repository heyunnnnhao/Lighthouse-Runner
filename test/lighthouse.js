/* lighthouse 测试 */
const LighthouseRunner = require('../lib/out.js');
const { makeJson } = require('../src/utils');

const mockUrl = 'https://www.example.com';

const times = 30;

const options = {
  mode: 'async',
};

new LighthouseRunner(mockUrl)
  .run(times, options)
  .then((res) => {
    if (!res) return;

    console.log(res.description);

    makeJson(res, './results/', 'report.json');

    return res;
  })
  .catch((error) => {
    throw Error(`lighthouseRunner error: ${error}`);
  });
