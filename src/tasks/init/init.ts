import {Task, TaskDef} from "../../core/task/task";

export interface InitTaskParams {
}

export class InitTask extends Task<InitTaskParams> {
  define(): TaskDef {
    return {
      name: 'init',
      description: 'init fops envs',
    };
  }

  run(options: InitTaskParams) {
    console.log(options);
    // npm i https://github.com/Eusen/fast-ops.git
    // create /config
    // copy config to dest
  }
}
