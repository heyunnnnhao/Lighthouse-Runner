import AuditDetails from './audits';

interface Score {
  value: number;
  valueBeforeOmit: number;
  standardDeviation: number;
  standardDeviationBeforeOmit: number;
  allScore: Array<number>;
  omittedRun: number;
}

interface ScoreDisplayModes {
  NUMERIC: 'numeric';
  BINARY: 'binary';
  MANUAL: 'manual';
  INFORMATIVE: 'informative';
  NOT_APPLICABLE: 'notApplicable';
  ERROR: 'error';
}

type ScoreDisplayMode = ScoreDisplayModes[keyof ScoreDisplayModes];

/**
 * @license Copyright 2021 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
interface MSRItem {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: ScoreDisplayMode;
  details?: AuditDetails;
  warnings?: string[];
  displayValue?: string;
  explanation?: string;
  errorMessage?: string;
  weight: number;
  group: string | null;
}

export interface RunnerResponse {
  score: Score | null;
  description: string;
  errors: Array<string | null> | null;
  timesRun: number;
  successfulRun: number;
  lighthouseVersion: string;
  lighthouseRunnerVersion: string;
  requestURL: string;
  finalUrl: string;
  fetchTime: string;
  userAgent: string;
  environment: any;
  throttling: any;
  emulation: any;
  msr: Array<MSRItem> | null;
}

export interface RunnerOption {
  mode: 'sync' | 'async' | 'god';
  curve?: number;
}
