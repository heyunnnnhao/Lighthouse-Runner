// go/lh-audit-metric-mapping
const fcpRelevantAudits = [
  "server-response-time",
  "render-blocking-resources",
  "redirects",
  "critical-request-chains",
  "uses-text-compression",
  "uses-rel-preconnect",
  "uses-rel-preload",
  "font-display",
  "unminified-javascript",
  "unminified-css",
  "unused-css-rules",
];

const lcpRelevantAudits = [
  ...fcpRelevantAudits,
  "largest-contentful-paint-element",
  "preload-lcp-image",
  "unused-javascript",
  "efficient-animated-content",
  "total-byte-weight",
];

const tbtRelevantAudits = [
  "long-tasks",
  "third-party-summary",
  "third-party-facades",
  "bootup-time",
  "mainthread-work-breakdown",
  "dom-size",
  "duplicated-javascript",
  "legacy-javascript",
  "viewport",
];

const clsRelevantAudits = [
  "layout-shift-elements",
  "non-composited-animations",
  "unsized-images",
  "preload-fonts", // actually in BP, rather than perf
];

export default {
  fcpRelevantAudits,
  lcpRelevantAudits,
  tbtRelevantAudits,
  clsRelevantAudits,
};
