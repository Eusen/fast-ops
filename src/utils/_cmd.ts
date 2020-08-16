import commander from 'commander';
import leven from 'leven';
import chalk from 'chalk';
import child_process from 'child_process';

export function exec(command: string) {
  return child_process.spawnSync(command, {
    shell: true,
    stdio: "inherit",
    cwd: process.cwd(),
  });
}

export function suggestCommands(program: commander.Command, unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd._name);

  let suggestion;

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
}

export function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
export function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}

export function enhanceErrorMessages(program: commander.Command, methodName, log) {
  commander.Command.prototype[methodName] = function(...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return;
    }
    this.outputHelp();
    console.log(`  ` + chalk.red(log(...args)));
    console.log();
    process.exit(1);
  };
}
