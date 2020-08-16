import chalk from 'chalk';
import {pathJoin} from './_path';
import {fsReadJson} from './_fs';

export function loadModule(commandName, moduleName) {
  const isNotFoundError = err => {
    return err.message.match(/Cannot find module/);
  };

  try {
    // @ts-ignore
    return require(moduleName);
  } catch (err) {
    if (isNotFoundError(err)) {
      try {
        // @ts-ignore
        return require('import-global')(moduleName);
      } catch (err2) {
        if (isNotFoundError(err2)) {
          // @ts-ignore
          const installCommand = `npm install -g`;
          console.log();
          console.log(
            `  Command ${chalk.cyan(`vue-ops ${commandName}`)} requires a global addon to be installed.\n` +
            `  Please run ${chalk.cyan(`${installCommand} ${moduleName}`)} and try again.`
          );
          console.log();
          process.exit(1);
        } else {
          throw err2;
        }
      }
    } else {
      throw err;
    }
  }
}

export function loadPackageJson() {
  let json = null;
  let safeCount = 0;
  const jsonPaths = ['./package.json'];
  while (!json) {
    if (safeCount++ > 10) {
      break;
    }

    try {
      json = require(jsonPaths.join('/'));
    } catch (e) {
    }

    if (json) {
      break;
    } else {
      jsonPaths.unshift('..');
    }
  }
  return json;
}

export function detectProjectType() {
  const packageJsonPath = pathJoin(process.cwd(), 'package.json');
  const packageJson = fsReadJson(packageJsonPath);
  const dependenciesKeys = [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})];
  const allDependencies = dependenciesKeys.join();

  if (allDependencies.includes('dcloudio')) {
    return 'uniapp';
  }

  if (allDependencies.includes('vue')) {
    return 'vue';
  }

  if (allDependencies.includes('@angular')) {
    return 'angular';
  }

  if (allDependencies.includes('react')) {
    return 'react';
  }

  return 'unknown';
}
