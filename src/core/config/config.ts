import {PageConfigDef} from "./pages/pages";
import {ComponentsConfigDef} from "./components/components";
import {ChangeLogDef} from "./change-log/change-log";
import {ApiConfigDef} from "./api/api";

export interface OpsConfigDef {
  pages?: PageConfigDef;
  components?: ComponentsConfigDef;
  changelog?: ChangeLogDef;
  api?: ApiConfigDef;
}

export class FopsConfig {
  static create = (def: OpsConfigDef) => def;
}
