import {Task, TaskDef} from "../../core/task/task";
import {detectProjectType, fsExists, Logger, pathJoin} from '../../utils';

const Types = {page: null, component: null};
const logger = Logger.create('generate');

export type GenerateTaskTypes = keyof typeof Types;

export interface GenerateTaskParams {
  type: GenerateTaskTypes;
  name: string;
}

export class GenerateTask extends Task<GenerateTaskParams> {
  define(): TaskDef {
    const types = Object.keys(Types);

    return {
      name: 'generate',
      alias: 'g',
      description: `generate component or page`,
      params: [
        {
          name: 'type',
          alias: 't',
          description: `Generate type`,
          isArg: true,
          isRequired: true,
          options: types,
        },
        {
          name: 'name',
          regexp: /^[a-zA-Z$_]{1}[a-zA-Z$_\d]{0,50}$/,
          description: 'Must be a legal variable name.',
          isArg: true,
          isRequired: true,
        },
      ]
    };
  }

  run(options: GenerateTaskParams) {
    const projectType = detectProjectType();

    const templateRootPath = pathJoin(__dirname, 'templates', projectType);

    if (!fsExists(templateRootPath)) {
      return logger.error(`Currently project type is not supported: '${projectType}'`);
    }
  }
}
