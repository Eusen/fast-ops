import commander from 'commander';
import chalk from 'chalk';
import envinfo from 'envinfo';
import {cleanArgs, enhanceErrorMessages, suggestCommands} from '../utils';

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

export abstract class Task<P = any> {
    abstract define(): TaskDef;

    abstract run(options: P);
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

            const argParams = def.params.filter(p => p.isArg);
            const params = def.params.filter(p => !p.isArg);

            const name = [
                def.name,
                ...argParams.map(p => {
                    return p.isRequired ? `<${p.name}>` : `[${p.name}]`;
                })
            ].join(' ');

            const cmd = this.command.command(name).description(def.description || '');

            params.forEach(p => {
                const paramName = [
                    `-${def.alias}`,
                    p.isValueRequired ? `--${def.name} <${def.name}>` : `--${def.name}`,
                ].join(', ');
                cmd.option(paramName, p.description, p.defaultValue);
            });

            cmd.action(function action() {
                const args = arguments;
                const keys = Object.keys(arguments);

                const cmdKey = keys.pop();
                const options = keys.reduce((_options, key) => {
                    _options[argParams[key].name] = args[key];
                    return _options;
                }, cleanArgs(args[cmdKey]));



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
