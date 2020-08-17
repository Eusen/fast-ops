import {Task, TaskDef} from '../../core/task';
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

    switch (projectType) {
      case "vue":
      case "uniapp":
      case "taro":
        break;
      default:
        console.error('  Unknown project type, please run this command in vue/uniapp/taro project');
    }
  }
}
