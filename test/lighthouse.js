/* lighthouse 测试 */
const LighthouseRunner = require('../out.js');
const { makeJson } = require('../src/utils');

const mockUrl = 'https://www.baidu.com';

const times = 3;

const options = {
  mode: 'sync',
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
