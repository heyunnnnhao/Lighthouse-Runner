import runLH from './runner';
import { mergeResponses } from './format';
import { fork } from 'child_process';
import * as path from 'path';
import { RunnerConfig, RunnerOption, RunnerResponse } from './interfaces';
const childPath = path.join(__dirname, '/child');

export default class LighthouseRunner {
  constructor(url = '') {
    this.url = url;
  }

  private url: string;

  private async generateChildProcess(configs: RunnerConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      const forked = fork(childPath);
      forked.send({ url: this.url, configs });
      forked.on('message', async (res: any) => {
        if (res?.isError) reject(res.error);
        resolve(res);
      });
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw Error('接受子进程数据失败 - ' + error);
      })
      .finally(() => {});
  }

  private async runLighthouse(times, options, configs) {
    console.log(`开始测试 ${this.url}`);

    let arr = [];

    for (let i = 0; i < times; i++) {
      arr.push(options.mode === 'async' ? this.generateChildProcess(configs) : await runLH(this.url, configs));
    }

    return Promise.allSettled(arr)
      .then((res): any => {
        // 获取所有成功跑分
        const validList = res.filter((i) => i.status === 'fulfilled');
        // 判断成功次数
        if (validList.length < 1) throw Error('跑分成功次数不足');
        // 获取promise.allsettled返回结果中的有用数据
        const values = validList.map((i: any) => i.value);
        // 合并多次跑分结果
        let result = mergeResponses(values, times);
        // 从promise.allsettled中获取错误信息
        result.errors = res.map((i: any) => i.reason && i.reason.toString());
        // 如果都没有问题就只返回一个null
        if (result.errors.every((i: any) => !i)) result.errors = null;

        return result;
      })
      .catch((error) => {
        throw Error('多次运行 lighthouse 失败 - ' + error);
      })
      .finally(() => {
        console.log(`结束测试 ${this.url}`);
      });
  }

  public async test() {
    console.log('success');
  }

  public errorTest() {
    throw Error('错误抛出测试');
  }

  // 入口函数 处理配置options
  public async run(times = 1, options: RunnerOption, configs: RunnerConfig) {
    return await this.runLighthouse(times, options, configs);
  }
}

export { RunnerConfig, RunnerOption, RunnerResponse };
