import {Task, TaskDef} from "../../core/task/task";

export interface ApiTaskParams {
}

export class ApiTask extends Task<ApiTaskParams> {
  define(): TaskDef {
    return {
      name: 'api',
      description: 'download swagger api json, and convert to api definitions files.',
    };
  }

  run(options: ApiTaskParams) {
    console.log(options);
  }
}
