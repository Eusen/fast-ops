import {PageConfigDef} from "./pages/pages";
import {ComponentsConfigDef} from "./components/components";
import {ChangeLogDef} from "./change-log/change-log";

export interface OpsConfigDef {
  pages: PageConfigDef;
  components: ComponentsConfigDef;
  changelog: ChangeLogDef;
}

export class OpsConfig {
  static create = (def: OpsConfigDef) => def;
}
