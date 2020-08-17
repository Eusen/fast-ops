export interface ChangeLogDef {
  name?: string;
  major?: MajorVersion[];
}

export interface MajorVersion {
  index?: number | string;
  current?: CurrentVersion[];
}

export interface CurrentVersion {
  index?: number | string;
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

export interface CommitLog {
  target?: string;
  description?: string;
  by?: string;
}

export interface IncrementalVersion {
  index?: number | string;
  versionType?: VersionTypes;
  feature?: CommitLog[];
  fix?: CommitLog[];
  docs?: CommitLog[];
  refactor?: CommitLog[];
  perf?: CommitLog[];
  test?: CommitLog[];
  chore?: CommitLog[];
}

export class ChangeLog {
  static create = (def: ChangeLogDef) => def;
}
