import {FopsConfig} from "src";
import {pages} from './config-pages';
import {changelog} from "./config-change-log";
import {components} from "./config-compoennts";
import {api} from "./config-api";

export default FopsConfig.create({
  pages,
  components,
  changelog,
  api,
});
