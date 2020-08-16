export interface ChangeLog {
  name?: string;
  major?: MajorVersion[];
}

export interface MajorVersion {
  index?: number;
  current?: CurrentVersion[];
}

export interface CurrentVersion {
  index?: number;
  incremental?: IncrementalVersion[];
}

export type VersionTypes =
    'snapshot'
    | 'alpha'
    | 'beta'
    | 'release'
    | '6A'
    | 'Final'
    | 'Pro'
    | 'Plus'
    | 'Retail'
    | 'DEMO'
    | 'Build'
    | 'Delux'
    | 'Enterprise'
    | 'M'
    | 'RC'
    | 'SR'
    | 'Trial'
    | 'Shareware'
    | 'Full';

export interface IncrementalVersion {
  index?: number;
  type?: VersionTypes;
  repair?: IncrementalRepair[];
  deprecated?: IncrementalDeprecated[];
  newlyIncreased?: IncrementalNewlyIncreased[];
  restructure?: IncrementalRestructure[];
}

export interface IncrementalRepair {
  module?: string;
  description?: string;
}

export interface IncrementalDeprecated {
  module?: string;
  description?: string;
}

export interface IncrementalNewlyIncreased {
  module?: string;
  description?: string;
}

export interface IncrementalRestructure {
  module?: string;
  description?: string;
}

export function createChangeLog(def: ChangeLog) {
  return def;
}
