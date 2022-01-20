import * as chromeLauncher from 'chrome-launcher';
import { runLH } from './runner';
import { mergeResponses } from './format';
import { LighthouseResponse, LighthouseRaw, PromiseAllSettledResponseItem, RunningOptions } from './interfaces';
import { fork } from 'child_process';
export default class LighthouseRunner {
  constructor(url: string = '') {
    this.url = url;
  }

  private url: string;

  private async generateChildProcess(): Promise<any> {
    return new Promise((resolve, reject) => {
      const forked = fork('./node_modules/@jd/lighthouse-runner/src/child');
      forked.send(this.url);
      forked.on('message', async (res: any) => {
        resolve(res);
      });
    })
      .then((res: any) => {
        return res;
      })
      .catch((error) => {
        throw Error('接受子进程数据失败' + error);
      });
  }

  private async runLighthouse(times, { isAsync = false, isGodMode = false, curveRatio = 1 }) {
    console.log('文档：http://npm.m.jd.com/package/@jd/lighthouse-runner');
    console.log(`\n开始测试 ${this.url}`);

    let arr = [];

    for (let i = 0; i < times; i++) {
      arr.push(isAsync ? this.generateChildProcess() : await runLH(this.url));
    }

    return Promise.allSettled(arr)
      .then((res: any) => {
        const validList = res.filter((i: any) => i.status === 'fulfilled');

        const reasonList = res.map((i: any) => i.reason && i.reason);

        if (validList.length < 1) throw Error('跑分成功次数不足');

        const values = validList.map((i: any) => i.value);

        let result = mergeResponses(values, times);

        result.warnings = reasonList;

        return result;
      })
      .catch((error) => {
        console.log(error);

        throw Error('多次运行 lighthouse 失败 ' + error);
      })
      .finally(() => {
        console.log(`结束测试 ${this.url}\n`);

        chromeLauncher.killAll();
      });
  }

  public async test() {
    console.log('success');
  }

  public errorTest() {
    throw Error('错误抛出测试');
  }

  // 入口函数 处理配置options
  public async run(times: number = 1, options: RunningOptions = {}): Promise<LighthouseResponse | null> {
    const isGodMode = options.mode === 'god';

    const isAsync = options.mode === 'async';

    const curveRatio = options.curve;

    return await this.runLighthouse(times, { isAsync, isGodMode, curveRatio });
  }
}
