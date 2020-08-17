import {Task, TaskDef} from "../../core/task/task";

const Types = {
  uniapp: null,
  taro: null,
  vue: null,
  angular: null,
};

export type CreateTaskTypes = keyof typeof Types;

export interface CreateTaskParams {
  type: CreateTaskTypes;
  name: string;
}

export class CreateTask extends Task<CreateTaskParams> {
  define(): TaskDef {
    const types = Object.keys(Types);

    return {
      name: 'create',
      description: 'create a new project',
      params: [
        {
          name: 'type',
          description: 'project types',
          isArg: true,
          isRequired: true,
          options: types,
        },
        {
          name: 'name',
          description: 'project name',
          isArg: true,
          isRequired: true,
        },
        {
          name: 'type1',
          description: 'project types',
          isRequired: true,
          options: types,
        },
        {
          name: 'name1',
          description: 'project name',
          isRequired: true,
        },
      ]
    };
  }

  run(options: CreateTaskParams) {
    console.log(options);
  }
}
