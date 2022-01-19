## Lighthouse 性能跑分

[Jnpm](http://npm.m.jd.com/package/@jd/lighthouse-runner)
[Coding](http://coding.jd.com/heyunhao1/lighthouse-runner/)
[Lighthouse](https://github.com/GoogleChrome/lighthouse)

使用：

```typescript
import LighthouseRunner from '@jd/lighthouse-runner';

const mockUrl = 'https://www.example.com/'; // 跑分url

const times = 3; // 跑分次数

const options = {
  mode: 'sync' | 'async',
};

// 使用
new LighthouseRunner(mockUrl)
  .run(times, options)
  .then((res) => {
    console.log(res.description); // 打印测试结果概览
    return res;
  })
  .catch((error) => {
    console.log(error);
  });

// 测试
new LighthouseRunner().test(); // 打印 'success!!!'

// 错误抛出测试
new LighthouseRunner().errortest(); // 抛出 '错误抛出测试' 错误
```
