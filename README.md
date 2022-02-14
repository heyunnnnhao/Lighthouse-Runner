## Lighthouse 性能跑分

[Jnpm](http://npm.m.jd.com/package/@jd/lighthouse-runner)  
[Coding](http://coding.jd.com/heyunhao1/lighthouse-runner/)  
[Lighthouse](https://github.com/GoogleChrome/lighthouse)

使用：

```typescript
import LighthouseRunner, { RunnerConfig, RunnerOption, RunnerResponse } from '../dist/src/index';

const mockUrl = 'https://www.example.com/'; // 跑分url

const times = 3; // 跑分次数

const options: RunnerOption = {
  mode: 'sync' | 'async', // 检测模式为同步或异步 推荐同步检测以避免异步带来的网速影响
};

// 使用
new LighthouseRunner(mockUrl)
  .run(times, options)
  .then((res: RunnerResponse) => {
    console.log(res.description); // 打印测试结果概览
    return res; // 返回结果
  })
  .catch((error) => {
    console.log(error);
  });

// 测试
new LighthouseRunner().test(); // 打印 'success!!!'

// 错误抛出测试
new LighthouseRunner().errortest(); // 抛出 '错误抛出测试' 错误
```

返回结果文档：

```json
{
  "score": {
    // 得分数据
    "value": 100, // 最终得分
    "valueBeforeOmit": 100, // 去尾前得分
    "standardDeviation": 0, // 标准差
    "standardDeviationBeforeOmit": 0, // 去尾前标准差
    "allScore": [100, 100, 100], // 全部得分
    "omittedRun": 1 // 去尾个数
  },
  "description": "3 / 3 次跑分成功 - 忽略最低的 1 次跑分 - 最后得分为 100", // 描述性文字
  "errors": null, // 错误文字
  "timesRun": 3, // 跑分次数
  "successfulRun": 3, // 跑分成功次数
  "lighthouseVersion": "9.2.0", // lighthouse 版本
  "lighthouseRunnerVersion": "1.3.0", // lighthouse-runner 版本
  "requestURL": "https://www.example.com/", // 请求 url
  "finalUrl": "https://www.example.com/", // 重定向后 url
  "fetchTime": "2022-01-20T03:45:38.396Z", // 请求时间
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/97.0.4692.71 Safari/537.36", // userAgent
  "environment": {
    // 环境参数
    "networkUserAgent": "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Mobile Safari/537.36 Chrome-Lighthouse",
    "hostUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/97.0.4692.71 Safari/537.36",
    "benchmarkIndex": 1224,
    "credits": { "axe-core": "4.3.5" }
  },
  "throttling": {
    // 性能网速限制参数
    "rttMs": 120,
    "throughputKbps": 2048,
    "requestLatencyMs": 337.5,
    "downloadThroughputKbps": 7372.8,
    "uploadThroughputKbps": 1843.2,
    "cpuSlowdownMultiplier": 2
  },
  "emulation": {
    // 移动端模拟参数
    "mobile": true,
    "width": 360,
    "height": 640,
    "deviceScaleFactor": 2.625,
    "disabled": false
  },
  "msr": [
    // 各项检查详细数据
    {
      "id": "first-contentful-paint", // id / 英文名
      "title": "First Contentful Paint", // 英文名
      "description": "首次内容渲染时间标记了渲染出首个文本或首张图片的时间。[了解详情](https://web.dev/first-contentful-paint/)。", // 描述文字 zh/en
      "score": 1, // 单项得分
      "scoreDisplayMode": "numeric", // 显示数据类型
      "numericValue": 654.4399999999999, // 检测数据值
      "numericUnit": "millisecond", // 单位
      "displayValue": "0.7 秒", // 显示数字
      "weight": 10, // 权重
      "group": "metrics" // 分类 metrics 为有权重 ｜ diagnostics 为无权重
    },
    {
      "id": "network-requests",
      "title": "Network Requests",
      "description": "Lists the network requests that were made during page load.",
      "score": null,
      "scoreDisplayMode": "informative",
      "details": {
        // 详细数据 通常为表格
        "type": "table",
        "headings": [
          // 表格列定义 key为列名
          { "key": "url", "itemType": "url", "text": "URL" },
          { "key": "protocol", "itemType": "text", "text": "Protocol" },
          { "key": "startTime", "itemType": "ms", "granularity": 1, "text": "Start Time" },
          { "key": "endTime", "itemType": "ms", "granularity": 1, "text": "End Time" },
          { "key": "transferSize", "itemType": "bytes", "displayUnit": "kb", "granularity": 1, "text": "Transfer Size" },
          { "key": "resourceSize", "itemType": "bytes", "displayUnit": "kb", "granularity": 1, "text": "Resource Size" },
          { "key": "statusCode", "itemType": "text", "text": "Status Code" },
          { "key": "mimeType", "itemType": "text", "text": "MIME Type" },
          { "key": "resourceType", "itemType": "text", "text": "Resource Type" }
        ],
        "items": [
          // 表格行数据
          {
            "url": "https://www.example.com/",
            "protocol": "h2",
            "startTime": 0,
            "endTime": 1053.522999980487,
            "finished": true,
            "transferSize": 852,
            "resourceSize": 1256,
            "statusCode": 200,
            "mimeType": "text/html",
            "resourceType": "Document"
          }
        ]
      },
      "weight": 0,
      "group": "diagnostics"
    }
  ]
}
```
