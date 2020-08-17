import {loadPackageJson} from '../utils';
import {TaskApp} from "../core/task/task";
import {GenerateTask} from './generate/generate';
import {CreateTask} from "./create/create";
import {ApiTask} from "./api/api";
import {ChangeLogTask} from "./change-log/change-log";
import {AutoTask} from "./auto/auto";
import {InitTask} from "./init/init";

const packageJson = loadPackageJson(true);

export default new TaskApp({
  name: 'fops',
  version: `fops v${packageJson.version}`,
  tasks: [
    CreateTask,
    InitTask,
    GenerateTask,
    ApiTask,
    ChangeLogTask,
    AutoTask,
  ]
});

