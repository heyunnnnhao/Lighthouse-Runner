import constants from "./constants/constants";
import UIStrings from "./constants/UIStrings";
import audits from "./configs/audits";
import auditRefs from "./configs/auditRefs";

const defaultConfig = {
  settings: constants.defaultSettings,
  passes: constants.defaultPassConfig,
  audits,
  groups: {
    metrics: {
      title: UIStrings.metricGroupTitle,
    },
    diagnostics: {
      title: UIStrings.diagnosticsGroupTitle,
      description: UIStrings.diagnosticsGroupDescription,
    },
  },
  categories: {
    performance: {
      title: UIStrings.performanceCategoryTitle,
      supportedModes: ["navigation", "timespan", "snapshot"],
      auditRefs,
    },
  },
};

export default defaultConfig;
