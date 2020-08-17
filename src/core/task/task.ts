import commander from 'commander';
import chalk from 'chalk';
import envinfo from 'envinfo';
import {enhanceErrorMessages, logError, renderMessage, suggestCommands} from '../../utils';

const hasParams = !!process.argv.slice(2).length;

export interface TaskParamDef<T = any> {
  name?: string;
  alias?: string;
  description?: string;
  options?: (string | number)[];
  regexp?: RegExp;
  isRequired?: boolean;
  isValueRequired?: boolean;
  isArg?: boolean;
  defaultValue?: string | boolean;

  parser?(value: string, previous: T): T;
}

export interface TaskDef {
  name: string;
  description?: string;
  alias?: string;
  params?: TaskParamDef[];
}

export interface Task<P = any> {
  define(): TaskDef;

  run(options: P);
}

export class Task<P = any> {
  checkOptions(options: P): boolean {
    const def = this.define();
    let result = true;

    def.params.forEach(param => {
      const value = options[param.name];

      // 因为 commander 本身自带必填校验，所以这里不做处理
      if (!value || !result) return;

      if (param.options) {
        if (!param.options.includes(value)) {
          result = false;
          logError(`param '${param.name}' must be one of ${param.options.join('|')}`);
        }
      }

      if (param.regexp) {
        if (!param.regexp.test(value)) {
          result = false;
          logError(`param '${param.name}' format not correct: ${value}`);
        }
      }
    });

    return result;
  }
}

export type TaskCtor<T extends Task> = new (...args: any[]) => T;

export interface TaskAppConfig {
  name: string;
  version?: string;
  usage?: string;
  tasks?: TaskCtor<Task>[];
}

export class TaskApp {
  private command: commander.Command;

  constructor(private config: TaskAppConfig) {
  }

  initApp() {
    this.command = new commander.Command(this.config.name);

    this.command.version(this.config.version)
        .usage(this.config.usage || '<command> [options]');

    const tasks = this.config.tasks.map((task) => new task());

    tasks.forEach(task => {
      const def = task.define();

      // split params & args
      const args = def.params ? def.params.filter(p => p.isArg) : [];
      const params = def.params ? def.params.filter(p => !p.isArg) : [];

      // mix name
      const name = [def.name, ...args.map(p => getArgName(p))].join(' ');

      // create cmd
      const cmd = this.command.command(name);

      // check params, if has params, print detail of args
      if (hasParams) {
        const descriptions = [];
        descriptions.push('Arguments:');
        args.forEach(arg => {
          descriptions.push(`  ${renderMessage("info", arg.name)}`);
          descriptions.push(`    ${getArgDescription(arg)}`);
        });
        descriptions.push('');
        cmd.description(descriptions.join('\n'));
      } else {
        cmd.description(def.description);
      }

      // set alias
      cmd.alias(def.alias);

      params.forEach(p => {
        const paramNames = [];
        if (p.alias) paramNames.push(`-${p.alias}`);
        paramNames.push(`--${p.name} ${getArgName(p)}`);
        const paramName = paramNames.join(', ');
        cmd.option(paramName, p.description, p.regexp, p.defaultValue);
      });

      cmd.action(function action() {
        const actionArgs = arguments;
        const keys = Object.keys(actionArgs);

        const actionCmd = keys.reduce((cmdInstance, key) => {
          if (actionArgs[key] instanceof commander.Command) {
            cmdInstance = actionArgs[key];
          }
          return cmdInstance;
        }, null as commander.Command);

        const options = keys.reduce((_options, key) => {
          switch (typeof actionArgs[key]) {
            case "boolean":
            case "number":
            case "string":
              _options[args[key].name] = actionArgs[key];
          }
          return _options;
        }, actionCmd.opts());

        // 检测选项是否合法
        if (!task.checkOptions(options)) return;

        task.run(options);
      });
    });
  }

  defOutputHelp() {
    // output help information on unknown commands
    this.command
        .arguments('<command>')
        .action((cmd) => {
          this.command.outputHelp();
          console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
          console.log();
          suggestCommands(this.command, cmd);
        });
  }

  defHelp() {
    // add some useful info on help
    this.command.on('--help', () => {
      console.log();
      console.log(`  Run ${chalk.cyan(`${this.config.name} <command> --help`)} for detailed usage of given command.`);
      console.log();
    });

    this.command.commands.forEach(c => c.on('--help', () => console.log()));
  }

  defInfo() {
    this.command
        .command('info')
        .description('print debugging information about your environment')
        .action(() => {
          console.log(chalk.bold('\nEnvironment Info:'));
          envinfo.run(
              {
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'Yarn', 'npm'],
                Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
                npmPackages: '',
                npmGlobalPackages: ['vue-ops']
              },
              {
                showNotFound: true,
                duplicates: true,
                fullTree: true
              }
          ).then(console.log);
        });
  }

  enhanceErrorMessages() {
    enhanceErrorMessages(this.command, 'missingArgument', argName => {
      return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
    });

    enhanceErrorMessages(this.command, 'unknownOption', optionName => {
      return `Unknown option ${chalk.yellow(optionName)}.`;
    });

    enhanceErrorMessages(this.command, 'optionMissingArgument', (option, flag) => {
      return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
          flag ? `, got ${chalk.yellow(flag)}` : ``
      );
    });
  }

  start() {
    this.initApp();
    this.defInfo();
    this.defHelp();
    this.defOutputHelp();
    this.enhanceErrorMessages();

    if (!process.argv.slice(2).length) {
      this.command.outputHelp();
    } else {
      // run command
      this.command.parse(process.argv);
    }
  }
}

function getArgName(arg: TaskParamDef) {
  return arg.isRequired ? `<${arg.name}>` : `[${arg.name}]`;
}

function getArgDescription(arg: TaskParamDef) {
  const desc = [arg.description];
  if (arg.options) {
    desc.push(`one of [${renderMessage("warning", arg.options.join(', '))}]`);
  }
  return desc.join(', ');
}
