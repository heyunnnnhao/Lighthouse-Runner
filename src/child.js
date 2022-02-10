const runLH = require('./runner');

process.on('message', (url) => {
  runLH(url)
    .then((res) => {
      process.send(res);
    })
    .catch((error) => {
      process.send({ isError: true, error: 'child 错误 - ' + error });
    });
});
