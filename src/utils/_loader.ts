import chalk from 'chalk';
import {pathBack, pathJoin, pathResolve} from './_path';
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

export function loadPackageJson(fromSelf = false) {
  let json = null;
  let jsonPath = fromSelf ? pathJoin(__dirname, 'package.json') : pathResolve('package.json');

  while (!json) {
    try {
      json = require(jsonPath);
    } catch (e) {
      jsonPath = pathBack(jsonPath);
    }
    if (jsonPath === '.') break;
  }
  return json;
}

export function detectProjectType() {
  const packageJson = loadPackageJson();
  const dependenciesKeys = [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})];
  const allDependencies = dependenciesKeys.join();

  if (allDependencies.includes('@dcloudio')) {
    return 'uniapp';
  }

  if (allDependencies.includes('@taro')) {
    return 'taro';
  }

  if (allDependencies.includes('@vue')) {
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
