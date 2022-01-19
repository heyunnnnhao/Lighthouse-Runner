import Result from 'lighthouse/types/lhr/lhr';
import Details from 'lighthouse/types/lhr/audit-details';
import { ConfigSettings, ThrottlingSettings, ScreenEmulationSettings } from 'lighthouse/types/lhr/settings';

declare module LighthouseResponse {
  interface MSRItemDetailsTable extends Details.Table {}

  interface MSRItemDetailsOpportunity extends Details.Opportunity {}

  interface MSRItemDetailsDebugdata extends Details.DebugData {}

  interface MSRItemDetailsCriticalrequestchain extends Details.CriticalRequestChain {}

  interface MSRItem {
    id: string;
    title: string;
    description: string;
    score: number | null;
    scoreDisplayMode: 'numeric' | 'binary' | 'manual' | 'informative' | 'notApplicable' | 'error';
    warnings?: Array<string>;
    weight: number;
    group: 'metrics' | 'diagnostics';
    numericValue: number | null;
    displayValue: string;
    numericUnit: 'millisecond' | 'unitless' | 'byte' | 'element' | null;
    details: MSRItemDetailsTable | MSRItemDetailsOpportunity | MSRItemDetailsDebugdata | MSRItemDetailsCriticalrequestchain;
  }

  interface Score {
    value: number;
    valueBeforeOmit: number;
    standardDeviation: number;
    standardDeviationBeforeOmit: number;
    allScore: Array<number> | null;
    omittedRuns: number;
  }
}

interface LighthouseResponse {
  score: LighthouseResponse.Score;
  description: string | null;
  lighthouseVersion: '9.2.0';
  requestURL: string;
  finalUrl: string;
  fetchTime: string;
  userAgent: string;
  environment: any;
  throttling: ThrottlingSettings;
  emulation: ScreenEmulationSettings;
  timesRun: number;
  successfulRun: number;
  msr: Array<LighthouseResponse.MSRItem>;
}

export interface RunningOptions {
  mode?: 'sync' | 'async' | 'god' | '';
  curve?: number;
}
export declare module PromiseAllSettledResponseItem {
  interface Fail {
    status: 'rejected';
    reason: any;
  }

  interface Success {
    status: 'fulfilled';
    value: LighthouseResponse;
  }
}

export type PromiseAllSettledResponseItem = PromiseAllSettledResponseItem.Fail | PromiseAllSettledResponseItem.Success;
export { LighthouseResponse, Result as LighthouseRaw, ConfigSettings as LighthouseConfigSettings };
