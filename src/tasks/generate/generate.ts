import ejs from 'ejs';
import {Task, TaskDef} from "../../core/task/task";
import {
  detectProjectType,
  fsExists,
  fsReadDir,
  fsReadFile,
  fsWriteFile,
  Logger,
  pathBasename,
  pathJoin,
} from '../../utils';
import {parseHumpFieldName, parseHumpName, parseSkewerName} from "../../utils/_parser";

const Types = {page: null, component: null};
const logger = Logger.create('generate');

export type GenerateTaskTypes = keyof typeof Types;

export interface GenerateTaskParams {
  type: GenerateTaskTypes;
  name: string;
  dir: string;
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
          regexp: /^[a-zA-Z$_]{1}[a-zA-Z$\-_\d]{0,50}$/,
          description: 'Must be a legal variable name.',
          isArg: true,
          isRequired: true,
        },
        {
          name: 'dir',
          description: 'The dir where the files are located.',
        },
      ]
    };
  }

  run(options: GenerateTaskParams) {
    const projectType = detectProjectType();

    const templateRootPath = pathJoin(__dirname, 'templates', projectType, options.type);

    if (!fsExists(templateRootPath)) {
      return logger.error(`currently project type is not supported: '${projectType}'`);
    }

    // 如果没指定 dir，则就地创建页面
    const dir = options.dir || process.cwd();

    const data = createData(options.name);

    const rootDir = pathJoin(dir, data.selectorName);

    fsReadDir(templateRootPath).forEach(filename => {
      const filepath = pathJoin(templateRootPath, filename);
      const fileContent = fsReadFile(filepath);

      const targetFilepath = pathJoin(rootDir, pathBasename(filename.replace('name', data.selectorName), '.ejs'));
      const targetFileContent = ejs.render(fileContent, data);

      fsWriteFile(targetFilepath, targetFileContent);
    });

    logger.success(`${options.type} created successfully!!`);
    logger.log(`    ${rootDir}`);
  }
}

function createData(name: string) {
  return {
    fileName: parseHumpFieldName(name),
    className: parseHumpName(name),
    selectorName: parseSkewerName(name),
    globalStylesImport: '',
  };
}
