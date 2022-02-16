import { AuditRef } from '../interfaces/audits';
import { complianceAuditsRaw } from '.';
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

export const performanceAuditRefs: Array<AuditRef> = [
  { id: 'first-contentful-paint', weight: 10, group: 'metrics', acronym: 'FCP', relevantAudits: fcpRelevantAudits },
  { id: 'interactive', weight: 10, group: 'metrics', acronym: 'TTI' },
  { id: 'speed-index', weight: 10, group: 'metrics', acronym: 'SI' },
  { id: 'total-blocking-time', weight: 30, group: 'metrics', acronym: 'TBT', relevantAudits: tbtRelevantAudits },
  { id: 'largest-contentful-paint', weight: 25, group: 'metrics', acronym: 'LCP', relevantAudits: lcpRelevantAudits },
  { id: 'cumulative-layout-shift', weight: 15, group: 'metrics', acronym: 'CLS', relevantAudits: clsRelevantAudits },
  { id: 'max-potential-fid', weight: 0 },
  { id: 'first-meaningful-paint', weight: 0, acronym: 'FMP' },
  { id: 'render-blocking-resources', weight: 0 },
  { id: 'uses-responsive-images', weight: 0 },
  { id: 'offscreen-images', weight: 0 },
  { id: 'unminified-css', weight: 0 },
  { id: 'unminified-javascript', weight: 0 },
  { id: 'unused-css-rules', weight: 0 },
  { id: 'unused-javascript', weight: 0 },
  { id: 'uses-optimized-images', weight: 0 },
  { id: 'modern-image-formats', weight: 0 },
  { id: 'uses-text-compression', weight: 0 },
  { id: 'uses-rel-preconnect', weight: 0 },
  { id: 'server-response-time', weight: 0 },
  { id: 'redirects', weight: 0 },
  { id: 'uses-rel-preload', weight: 0 },
  { id: 'uses-http2', weight: 0 },
  { id: 'efficient-animated-content', weight: 0 },
  { id: 'duplicated-javascript', weight: 0 },
  { id: 'legacy-javascript', weight: 0 },
  { id: 'preload-lcp-image', weight: 0 },
  { id: 'total-byte-weight', weight: 0 },
  { id: 'uses-long-cache-ttl', weight: 0 },
  { id: 'dom-size', weight: 0 },
  { id: 'critical-request-chains', weight: 0 },
  { id: 'user-timings', weight: 0 },
  { id: 'bootup-time', weight: 0 },
  { id: 'mainthread-work-breakdown', weight: 0 },
  { id: 'font-display', weight: 0 },
  { id: 'resource-summary', weight: 0 },
  { id: 'third-party-summary', weight: 0 },
  { id: 'third-party-facades', weight: 0 },
  { id: 'largest-contentful-paint-element', weight: 0 },
  { id: 'lcp-lazy-loaded', weight: 0 },
  { id: 'layout-shift-elements', weight: 0 },
  { id: 'uses-passive-event-listeners', weight: 0 },
  { id: 'no-document-write', weight: 0 },
  { id: 'long-tasks', weight: 0 },
  { id: 'non-composited-animations', weight: 0 },
  { id: 'unsized-images', weight: 0 },
  { id: 'viewport', weight: 0 },
  { id: 'network-requests', weight: 0 },
  { id: 'network-rtt', weight: 0 },
  { id: 'network-server-latency', weight: 0 },
  { id: 'main-thread-tasks', weight: 0 },
  { id: 'diagnostics', weight: 0 },
  { id: 'metrics', weight: 0 },
];

export const complianceAuditRefs = complianceAuditsRaw.map((audit) => {
  return { id: audit, weight: 0 };
});
