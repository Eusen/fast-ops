import {OpsConfig} from "../src";
import {pages} from './config-pages';
import {changelog} from "./config-change-log";
import {components} from "./config-compoennts";

export default OpsConfig.create({
  pages,
  components,
  changelog,
});
