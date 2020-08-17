import {MiniAppPageConfig} from "./mini-app/mini-app";
import {AppPageConfig} from "./app/app";

export type PageConfigDef = AppPageConfig | MiniAppPageConfig;

export class PagesConfig {
  static create = (def: PageConfigDef) => def;
}
