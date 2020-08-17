import {TaskApp} from "../core/task/task";
import {loadPackageJson} from '../utils';
import {GenerateTask} from './generate/generate';

const packageJson = loadPackageJson();

export default new TaskApp({
  name: packageJson.name,
  version: `${packageJson.name} ${packageJson.version}`,
  tasks: [
    GenerateTask,
  ]
});

