## Lighthouse 性能跑分

[Jnpm](http://npm.m.jd.com/package/@jd/lighthouse-runner)
[Coding](http://coding.jd.com/heyunhao1/lighthouse-runner/)
[Lighthouse](https://github.com/GoogleChrome/lighthouse)

使用：

```typescript
import LighthouseRunner from '@jd/lighthouse-runner';

const mockUrl = 'https://www.example.com/'; // 跑分url

const times = 3; // 跑分次数

new LighthouseRunner(mockUrl)
  .run(times)
  .then((res) => {
    console.log('最终得分为', res.score.value);
    return res;
  })
  .catch((error) => {
    console.log(error);
  });
```

测试:

```typescript
import LighthouseRunner from '@jd/lighthouse-runner';

new LighthouseRunner().test();
// 打印 'success!!!'
```

错误抛出测试

```typescript
import LighthouseRunner from '@jd/lighthouse-runner';

new LighthouseRunner().errorTest();
```
