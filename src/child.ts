import runLH from './runner';

process.on('message', ({ url, configs }) => {
  runLH(url, configs)
    .then((res) => {
      process.send(res);
    })
    .catch((error) => {
      process.send({ isError: true, error: 'child 错误 - ' + error });
    });
});
