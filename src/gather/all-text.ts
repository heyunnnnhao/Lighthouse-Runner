const Gatherer = require('lighthouse').Gatherer;
const Puppeteer = require('puppeteer-core');
const { convert } = require('html-to-text');

async function connect(driver) {
  const browser = await Puppeteer.connect({
    browserWSEndpoint: await driver.wsEndpoint(),
    defaultViewport: null,
  });

  const { targetInfo } = await driver.sendCommand('Target.getTargetInfo');

  const puppeteerTarget = (await browser.targets()).find((target) => target._targetId === targetInfo.targetId);

  const page = await puppeteerTarget.page();

  return { browser, page, executionContext: driver.executionContext };
}

class AllText extends Gatherer {
  async afterPass(options) {
    const { driver } = options;

    const { page } = await connect(driver);

    const result = await page.content();

    let text = convert(result, {
      wordwrap: null,
      noAnchorUrl: true,
    });

    let arr = text
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => {
        return i.length > 0 && i[0] !== '[';
      });

    return arr;
  }
}

module.exports = AllText;
