import { runLH } from './runner';

process.on('message', async (url) => {
  const result = await runLH(url);

  process.send(result);
});
