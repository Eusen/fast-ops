import {Task, TaskDef} from '../../core/task-core';
import {detectProjectType} from '../../utils';

const Types = {page: null, component: null};

export type GenerateTaskTypes = keyof typeof Types;

export interface GenerateTaskParams {
  type: GenerateTaskTypes;
  name: string;
}

export class GenerateTask implements Task<GenerateTaskParams> {
  define(): TaskDef {
    return {
      name: 'generate',
      alias: 'g',
      params: [
        {
          name: 'type',
          alias: 't',
          isArg: true,
          isRequired: true,
          options: Object.keys(Types),
        },
        {
          name: 'name',
          isArg: true,
          isRequired: true,
          options: Object.keys(Types),
        }
      ]
    };
  }

  run(options: GenerateTaskParams) {
    const projectType = detectProjectType();
  }
}
