import {loadPackageJson} from '../utils';
import {TaskApp} from "../core/task/task";
import {GenerateTask} from './generate/generate';
import {CreateTask} from "./create/create";
import {ApiTask} from "./api/api";
import {ChangeLogTask} from "./change-log/change-log";
import {AutoTask} from "./auto/auto";

const packageJson = loadPackageJson();

export default new TaskApp({
  name: 'fops',
  version: `${packageJson.name} ${packageJson.version}`,
  tasks: [
    CreateTask,
    ApiTask,
    AutoTask,
    GenerateTask,
    ChangeLogTask,
  ]
});

