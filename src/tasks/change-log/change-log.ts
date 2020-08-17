import {Task, TaskDef} from "../../core/task/task";

export interface ChangeLogTaskParams {
}

export class ChangeLogTask extends Task<ChangeLogTaskParams> {
  define(): TaskDef {
    return {
      name: 'change-log',
    };
  }

  run(options: ChangeLogTaskParams) {
    console.log(options);
  }
}
