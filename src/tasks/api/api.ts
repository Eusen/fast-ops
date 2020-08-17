import {Task, TaskDef} from "../../core/task/task";

export interface ApiTaskParams {
}

export class ApiTask extends Task<ApiTaskParams> {
  define(): TaskDef {
    return {
      name: 'api',
    };
  }

  run(options: ApiTaskParams) {
    console.log(options);
  }
}
