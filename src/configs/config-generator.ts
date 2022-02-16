import { defaultSettings, defaultPassConfig } from './constants';
import { performanceAuditRefs, complianceAuditRefs } from '../audit/auditRefs';
import { performanceAudits, complianceAudits } from '../audit';
import { performanceGatherers, complianceGatherers } from '../gather';

export default function configGenerator(configs) {
  const categories = Object.keys(configs);

  const gatherers = [...performanceGatherers, ...complianceGatherers];
  
  return {
    settings: defaultSettings,
    passes: [{ ...defaultPassConfig, gatherers }],
    audits: [...performanceAudits, ...complianceAudits],
    groups: {
      metrics: {
        title: 'Metrics',
        description: 'Audits that get counted in performance scoring',
      },
    },
    categories: {
      performance: {
        title: 'Performance',
        supportedModes: ['navigation', 'timespan', 'snapshot'],
        auditRefs: performanceAuditRefs,
      },
      compliance: {
        title: 'Compliance',
        supportedModes: ['navigation', 'timespan', 'snapshot'],
        auditRefs: complianceAuditRefs,
      },
    },
  };
}
