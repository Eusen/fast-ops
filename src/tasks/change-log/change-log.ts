import {Task, TaskDef} from "../../core/task/task";

export interface ChangeLogTaskParams {
}

export class ChangeLogTask extends Task<ChangeLogTaskParams> {
  define(): TaskDef {
    return {
      name: 'change-log',
      alias: 'clog',
      description: `auto build 'CHANGELOG.md' based on change-log config`,
    };
  }

  run(options: ChangeLogTaskParams) {
    console.log(options);
  }
}
