const runLH = require('./runner');
const { mergeResponses } = require('./format');
const { fork } = require('child_process');
const process = require('process');

const childPath = process.env?.NODE_ENV === 'development' ? 'src/child' : './node_modules/@jd/lighthouse-runner/src/child';
class LighthouseRunner {
  constructor(url = '') {
    this.url = url;
  }

  async generateChildProcess() {
    return new Promise((resolve, reject) => {
      const forked = fork(childPath);
      forked.send(this.url);
      forked.on('message', async (res) => {
        resolve(res);
      });
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw Error('接受子进程数据失败' + error);
      })
      .finally(() => {});
  }

  async runLighthouse(times, { isAsync = false, isGodMode = false, curveRatio = 1 }) {
    console.log(`开始测试 ${this.url}`);

    let arr = [];

    for (let i = 0; i < times; i++) {
      arr.push(isAsync ? this.generateChildProcess() : await runLH(this.url));
    }

    return Promise.allSettled(arr)
      .then((res) => {
        // 获取所有成功跑分
        const validList = res.filter((i) => i.status === 'fulfilled');
        // 判断成功次数
        if (validList.length < 1) throw Error('跑分成功次数不足');
        // 获取promise.allsettled返回结果中的有用数据
        const values = validList.map((i) => i.value);
        // 合并多次跑分结果
        let result = mergeResponses(values, times);
        // 从promise.allsettled中获取错误信息
        result.errors = res.map((i) => i.reason && i.reason);
        // 如果都没有问题就只返回一个null
        if (result.errors.every((i) => !i)) result.errors = null;

        return result;
      })
      .catch((error) => {
        console.log(error);

        throw Error('多次运行 lighthouse 失败 ' + error);
      })
      .finally(() => {
        console.log(`结束测试 ${this.url}`);
      });
  }

  async test() {
    console.log('success');
  }

  errorTest() {
    throw Error('错误抛出测试');
  }

  // 入口函数 处理配置options
  async run(times = 1, options = {}) {
    const isGodMode = options?.mode === 'god';

    const isAsync = options?.mode === 'async';

    const curveRatio = options?.curve;

    return await this.runLighthouse(times, { isAsync, isGodMode, curveRatio });
  }
}

module.exports = LighthouseRunner;
