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
  // Using a "broadband" connection type
  // Corresponds to "Dense 4G 25th percentile" in https://docs.google.com/document/d/1Ft1Bnq9-t4jK5egLSOc28IL4TvR-Tt0se_1faTA4KTY/edit#heading=h.bb7nfy2x9e5v
  desktopDense4G: {
    rttMs: 40,
    throughputKbps: 10 * 1024,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0, // 0 means unset
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
};

const MOBILE_EMULATION_METRICS = {
  mobile: true,
  width: 360,
  height: 640,
  // Moto G4 is really 3, but a higher value here works against
  // our perf recommendations.
  // https://github.com/GoogleChrome/lighthouse/issues/10741#issuecomment-626903508
  deviceScaleFactor: 2.625,
  disabled: false,
};

const DESKTOP_EMULATION_METRICS = {
  mobile: false,
  width: 1350,
  height: 940,
  deviceScaleFactor: 1,
  disabled: false,
};

const screenEmulationMetrics = {
  mobile: MOBILE_EMULATION_METRICS,
  desktop: DESKTOP_EMULATION_METRICS,
};

const MOTOG4_USERAGENT = 'Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Mobile Safari/537.36 Chrome-Lighthouse'; // eslint-disable-line max-len
const DESKTOP_USERAGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse'; // eslint-disable-line max-len

const userAgents = {
  mobile: MOTOG4_USERAGENT,
  desktop: DESKTOP_USERAGENT,
};

/** @type {LH.Config.Settings} */
const defaultSettings = {
  output: ['json'],
  maxWaitForFcp: 30 * 1000,
  maxWaitForLoad: 45 * 1000,

  formFactor: 'mobile',
  throttling: throttling.customThrottling,
  throttlingMethod: 'simulate',
  screenEmulation: screenEmulationMetrics.mobile,
  emulatedUserAgent: userAgents.mobile,

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

/** @type {LH.Config.Pass} */
const defaultPassConfig = [
  {
    passName: 'defaultPass',
    recordTrace: true,
    useThrottling: true,
    pauseAfterFcpMs: 1000,
    pauseAfterLoadMs: 1000,
    networkQuietThresholdMs: 1000,
    cpuQuietThresholdMs: 1000,
    gatherers: [
      'css-usage',
      'js-usage',
      'viewport-dimensions',
      'console-messages',
      'anchor-elements',
      'image-elements',
      'link-elements',
      'meta-elements',
      'script-elements',
      'iframe-elements',
      'form-elements',
      'main-document-content',
      'global-listeners',
      'dobetterweb/doctype',
      'dobetterweb/domstats',
      'dobetterweb/optimized-images',
      'dobetterweb/password-inputs-with-prevented-paste',
      'dobetterweb/response-compression',
      'dobetterweb/tags-blocking-first-paint',
      'seo/font-size',
      'seo/embedded-content',
      'seo/robots-txt',
      'seo/tap-targets',
      'accessibility',
      'trace-elements',
      'inspector-issues',
      'source-maps',
    ],
  },
];

const nonSimulatedPassConfigOverrides = {
  pauseAfterFcpMs: 5250,
  pauseAfterLoadMs: 5250,
  networkQuietThresholdMs: 5250,
  cpuQuietThresholdMs: 5250,
};

const UIStrings = {
  /** Title of the Performance category of audits. Equivalent to 'Web performance', this term is inclusive of all web page speed and loading optimization topics. Also used as a label of a score gauge; try to limit to 20 characters. */
  performanceCategoryTitle: 'Performance',
  /** Title of the Budgets section of the Performance Category. 'Budgets' refers to a budget (like a financial budget, but applied to the amount of resources on a page, rather than money. */
  budgetsGroupTitle: 'Budgets',
  /** Description of the Budgets section of the Performance category. Within this section the budget results are displayed. */
  budgetsGroupDescription: 'Performance budgets set standards for the performance of your site.',
  /** Title of the speed metrics section of the Performance category. Within this section are various speed metrics which quantify the pageload performance into values presented in seconds and milliseconds. */
  metricGroupTitle: 'Metrics',
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupTitle: 'First Paint Improvements',
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupDescription: 'The most critical aspect of performance is how quickly pixels are rendered onscreen. Key metrics: First Contentful Paint, First Meaningful Paint',
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupTitle: 'Overall Improvements',
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupDescription: 'Enhance the overall loading experience, so the page is responsive and ready to use as soon as possible. Key metrics: Time to Interactive, Speed Index',
  /** Title of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on the page's page load performance characteristics. Whereas the 'Opportunities' suggest an action along with expected time savings, diagnostics do not. Within this section, the user may read the details and deduce additional actions they could take. */
  diagnosticsGroupTitle: 'Diagnostics',
  /** Description of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on a web page's load performance characteristics. Within this section, the user may read the details and deduce additional actions they could take to improve performance. */
  diagnosticsGroupDescription: "More information about the performance of your application. These numbers don't [directly affect](https://web.dev/performance-scoring/) the Performance score.",
};

module.exports = {
  throttling,
  screenEmulationMetrics,
  userAgents,
  defaultSettings,
  defaultPassConfig,
  nonSimulatedPassConfigOverrides,
  UIStrings,
};
