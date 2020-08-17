import {Task, TaskDef} from "../../core/task/task";

export interface AutoTaskParams {
}

export class AutoTask extends Task<AutoTaskParams> {
  define(): TaskDef {
    return {
      name: 'auto',
      description: 'auto ops anything based on config'
    };
  }

  run(options: AutoTaskParams) {
    console.log(options);
  }
}
