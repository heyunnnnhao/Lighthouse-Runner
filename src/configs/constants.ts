import { performanceGatherers, complianceGatherers } from '../gather';

const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

const throttling = {
  DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
  DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
  // opinionated custom throttling
  // based on examples from https://github.com/WPO-Foundation/webpagetest/blob/master/www/settings/connectivity.ini.sample
  customThrottling: {
    rttMs: 120,
    throughputKbps: 2 * 1024,
    requestLatencyMs: 90 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
    downloadThroughputKbps: 8 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    uploadThroughputKbps: 2 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    cpuSlowdownMultiplier: 2,
  },
  // These values align with WebPageTest's definition of "Fast 3G"
  // But offer similar charateristics to roughly the 75th percentile of 4G connections.
  mobileSlow4G: {
    rttMs: 150,
    throughputKbps: 1.6 * 1024,
    requestLatencyMs: 150 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
    downloadThroughputKbps: 1.6 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    uploadThroughputKbps: 750 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    cpuSlowdownMultiplier: 4,
  },
  // These values partially align with WebPageTest's definition of "Regular 3G".
  // These values are meant to roughly align with Chrome UX report's 3G definition which are based
  // on HTTP RTT of 300-1400ms and downlink throughput of <700kbps.
  mobileRegular3G: {
    rttMs: 300,
    throughputKbps: 700,
    requestLatencyMs: 300 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
    downloadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    uploadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    cpuSlowdownMultiplier: 4,
  },
};

const EMULATION_METRICS = {
  mobile: true,
  width: 360,
  height: 640,
  // Moto G4 is really 3, but a higher value here works against
  // our perf recommendations.
  // https://github.com/GoogleChrome/lighthouse/issues/10741#issuecomment-626903508
  deviceScaleFactor: 2.625,
  disabled: false,
};

const MOBILE_USERAGENT = 'Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Mobile Safari/537.36 Chrome-Lighthouse'; // eslint-disable-line max-len

const defaultSettings = {
  output: ['json'],
  maxWaitForFcp: 30 * 1000,
  maxWaitForLoad: 45 * 1000,

  formFactor: 'mobile',
  throttling: throttling.customThrottling,
  throttlingMethod: 'simulate',
  screenEmulation: EMULATION_METRICS,
  emulatedUserAgent: MOBILE_USERAGENT,

  auditMode: false,
  gatherMode: false,
  disableStorageReset: false,
  debugNavigation: false,
  channel: 'node',

  // the following settings have no defaults but we still want ensure that `key in settings`
  // in config will work in a typechecked way
  budgets: null,
  locale: 'zh', // language is set to be Simplified CHinese
  blockedUrlPatterns: null,
  additionalTraceCategories: null,
  extraHeaders: null,
  precomputedLanternData: null,
  onlyAudits: null,
  onlyCategories: null,
  skipAudits: null,
};

const defaultPassConfig = {
  passName: 'defaultPass',
  recordTrace: true,
  useThrottling: true,
  pauseAfterFcpMs: 1000,
  pauseAfterLoadMs: 1000,
  networkQuietThresholdMs: 1000,
  cpuQuietThresholdMs: 1000,
  gatherers: [...performanceGatherers],
};

export { throttling, defaultSettings, defaultPassConfig };
