const lighthouse = require('lighthouse');
import * as chromeLauncher from 'chrome-launcher';
import { random } from 'lodash';
import config from './config-override';
import format from './format';
import { LighthouseResponse, LighthouseRaw, PromiseAllSettledResponseItem, RunningOptions } from './interfaces';

export default class LighthouseRunner {
  constructor(url: string = '', options: RunningOptions = {}) {
    this.url = url;
    this.options = options;
  }

  private url: string;

  private options: RunningOptions = {
    mode: 'normal',
    cheat: false,
  };

  private counter: number = 0;

  private chromeOptions() {
    return {
      port: random(1, 65535, false),
      chromeFlags: ['--headless', '--disable-gpu', '--enable-automation', '--disable-device-discovery-notifications', '--disable-sync'],
    };
  }

  private async runLighthouse(): Promise<LighthouseResponse> {
    const startTime = Date.now();

    let result, chrome, rawResult: LighthouseRaw;

    try {
      chrome = await chromeLauncher.launch(this.chromeOptions());
    } catch (error) {
      throw Error('启动 chrome 失败 ' + error);
    }

    try {
      this.counter++;
      console.log('--------', this.url, this.counter, 'begin at', Date.now(), '---------');
      console.log('\n\trunning at port', chrome.port, '\n');
      rawResult = await lighthouse(this.url, { port: chrome.port }, config);
      console.log('--------', this.url, this.counter, 'finished', Date.now(), '---------');
      console.log('\n\n\n');
    } catch (error) {
      throw Error('运行 lighthouse 失败 ' + error);
    }

    try {
      await chrome.kill();
    } catch (error) {
      throw Error('关闭 chrome 失败 ' + error);
    }

    result = format(rawResult, 1);
    // 添加跑分用时
    result.usedTime = Date.now() - startTime;

    return result;
  }

  private async runLighthouseMultiple(times: number): Promise<LighthouseResponse> {
    let promises = [];

    for (let i = 0; i < times; i++) {
      promises.push(await this.runLighthouse());
    }

    return Promise.allSettled(promises)
      .then((res: Array<PromiseAllSettledResponseItem>) => {
        // 跑分成功的列表，过滤掉失败的
        const validList = res.filter((i) => i.status === 'fulfilled').map((i: any) => i.value);

        if (validList.length < 1) throw Error('有效跑分次数不足！ ');

        return format(validList, times);
      })
      .catch((error) => {
        throw Error('多次运行 lighthouse 失败 ' + error);
      })
      .finally(() => {
        this.counter = 0;
        chromeLauncher.killAll();
      });
  }

  private async test() {
    console.log('success');
    return await 200;
  }

  private errorTest() {
    throw Error('错误抛出测试');
  }

  public async run(times: number = 1): Promise<LighthouseResponse | null | number> {
    const mode = this.options.mode || 'normal';

    let result = null;

    if (mode === 'test') {
      result = await this.test();
    } else if (mode === 'errortest') {
      this.errorTest();
    } else {
      if (times === 1) {
        result = await this.runLighthouse();
      } else {
        result = await this.runLighthouseMultiple(times);
      }
    }

    return result;
  }
}

export * from './interfaces';
