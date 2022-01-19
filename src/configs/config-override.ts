import constants from "../constants/constants";
import UIStrings from "../constants/UIStrings";
import audits from "./audits";
import auditRefs from "./auditRefs";

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
