const runLH = require('./runner');

process.on('message', async (url) => {
  const result = await runLH(url);

  process.send(result);
});
