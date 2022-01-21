// go/lh-audit-metric-mapping
const fcpRelevantAudits = [
  'server-response-time',
  'render-blocking-resources',
  'redirects',
  'critical-request-chains',
  'uses-text-compression',
  'uses-rel-preconnect',
  'uses-rel-preload',
  'font-display',
  'unminified-javascript',
  'unminified-css',
  'unused-css-rules',
];

const lcpRelevantAudits = [...fcpRelevantAudits, 'largest-contentful-paint-element', 'preload-lcp-image', 'unused-javascript', 'efficient-animated-content', 'total-byte-weight'];

const tbtRelevantAudits = [
  'long-tasks',
  'third-party-summary',
  'third-party-facades',
  'bootup-time',
  'mainthread-work-breakdown',
  'dom-size',
  'duplicated-javascript',
  'legacy-javascript',
  'viewport',
];

const clsRelevantAudits = [
  'layout-shift-elements',
  'non-composited-animations',
  'unsized-images',
  'preload-fonts', // actually in BP, rather than perf
];

const weightedAudits = [
  { id: 'first-contentful-paint', weight: 10, group: 'metrics', acronym: 'FCP', relevantAudits: fcpRelevantAudits },
  { id: 'interactive', weight: 10, group: 'metrics', acronym: 'TTI' },
  { id: 'speed-index', weight: 10, group: 'metrics', acronym: 'SI' },
  { id: 'total-blocking-time', weight: 30, group: 'metrics', acronym: 'TBT', relevantAudits: tbtRelevantAudits },
  { id: 'largest-contentful-paint', weight: 25, group: 'metrics', acronym: 'LCP', relevantAudits: lcpRelevantAudits },
  { id: 'cumulative-layout-shift', weight: 15, group: 'metrics', acronym: 'CLS', relevantAudits: clsRelevantAudits },
];

const unweightedAudits = [
  { id: 'max-potential-fid', weight: 0, group: 'diagnostics' },
  { id: 'first-meaningful-paint', weight: 0, acronym: 'FMP', group: 'diagnostics' },
  { id: 'render-blocking-resources', weight: 0, group: 'diagnostics' },
  { id: 'uses-responsive-images', weight: 0, group: 'diagnostics' },
  { id: 'offscreen-images', weight: 0, group: 'diagnostics' },
  { id: 'unminified-css', weight: 0, group: 'diagnostics' },
  { id: 'unminified-javascript', weight: 0, group: 'diagnostics' },
  { id: 'unused-css-rules', weight: 0, group: 'diagnostics' },
  { id: 'unused-javascript', weight: 0, group: 'diagnostics' },
  { id: 'uses-optimized-images', weight: 0, group: 'diagnostics' },
  { id: 'modern-image-formats', weight: 0, group: 'diagnostics' },
  { id: 'uses-text-compression', weight: 0, group: 'diagnostics' },
  { id: 'uses-rel-preconnect', weight: 0, group: 'diagnostics' },
  { id: 'server-response-time', weight: 0, group: 'diagnostics' },
  { id: 'redirects', weight: 0, group: 'diagnostics' },
  { id: 'uses-rel-preload', weight: 0, group: 'diagnostics' },
  { id: 'uses-http2', weight: 0, group: 'diagnostics' },
  { id: 'efficient-animated-content', weight: 0, group: 'diagnostics' },
  { id: 'duplicated-javascript', weight: 0, group: 'diagnostics' },
  { id: 'legacy-javascript', weight: 0, group: 'diagnostics' },
  { id: 'preload-lcp-image', weight: 0, group: 'diagnostics' },
  { id: 'total-byte-weight', weight: 0, group: 'diagnostics' },
  { id: 'uses-long-cache-ttl', weight: 0, group: 'diagnostics' },
  { id: 'dom-size', weight: 0, group: 'diagnostics' },
  { id: 'critical-request-chains', weight: 0, group: 'diagnostics' },
  { id: 'user-timings', weight: 0, group: 'diagnostics' },
  { id: 'bootup-time', weight: 0, group: 'diagnostics' },
  { id: 'mainthread-work-breakdown', weight: 0, group: 'diagnostics' },
  { id: 'font-display', weight: 0, group: 'diagnostics' },
  { id: 'resource-summary', weight: 0, group: 'diagnostics' },
  { id: 'third-party-summary', weight: 0, group: 'diagnostics' },
  { id: 'third-party-facades', weight: 0, group: 'diagnostics' },
  { id: 'largest-contentful-paint-element', weight: 0, group: 'diagnostics' },
  { id: 'lcp-lazy-loaded', weight: 0, group: 'diagnostics' },
  { id: 'layout-shift-elements', weight: 0, group: 'diagnostics' },
  { id: 'uses-passive-event-listeners', weight: 0, group: 'diagnostics' },
  { id: 'no-document-write', weight: 0, group: 'diagnostics' },
  { id: 'long-tasks', weight: 0, group: 'diagnostics' },
  { id: 'non-composited-animations', weight: 0, group: 'diagnostics' },
  { id: 'unsized-images', weight: 0, group: 'diagnostics' },
  { id: 'viewport', weight: 0, group: 'diagnostics' },
  { id: 'network-requests', weight: 0, group: 'diagnostics' },
  { id: 'network-rtt', weight: 0, group: 'diagnostics' },
  { id: 'network-server-latency', weight: 0, group: 'diagnostics' },
  { id: 'main-thread-tasks', weight: 0, group: 'diagnostics' },
  { id: 'diagnostics', weight: 0, group: 'diagnostics' },
  { id: 'metrics', weight: 0, group: 'diagnostics' },
];

const auditRefs = weightedAudits.concat(unweightedAudits);

function weightCheck(auditsList) {
  const weightSum = auditsList.reduce((a, b) => {
    return a + b.weight;
  }, 0);

  return weightSum === 100;
}

if (!weightCheck(auditRefs)) throw Error('总权重必须是 100!!!');

module.exports = auditRefs;
