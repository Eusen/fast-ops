import {PageConfigDef} from "./page/page";

export interface OpsConfigDef {
  pages: PageConfigDef;
}

export class OpsConfig {
  static create = (def: OpsConfigDef) => def;
}
