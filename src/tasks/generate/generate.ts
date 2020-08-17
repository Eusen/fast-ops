import {Task, TaskDef} from '../../core/task';
import {detectProjectType, fsExists, pathJoin} from '../../utils';

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

    const templateRootPath = pathJoin(__dirname, 'templates', projectType);

    if (!fsExists(templateRootPath)) {
      return console.error(`  Project type is not currently supported: '${projectType}'`);
    }
  }
}
