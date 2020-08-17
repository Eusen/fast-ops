import {Task, TaskDef} from "../../core/task/task";

export interface CreateTaskParams {
}

export class CreateTask extends Task<CreateTaskParams> {
  define(): TaskDef {
    return {
      name: 'create',
    };
  }

  run(options: CreateTaskParams) {
    console.log(options);
  }
}
