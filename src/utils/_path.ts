import path from 'path';

/**
 * 从当前项目的根目录
 */
export function pathFromRoot(...paths: string[]) {
  return path.join(process.cwd(), ...paths);
}

export function pathJoin(...paths: string[]) {
  return path.join(...paths);
}

export function pathBasename(_path: string, ext?: string) {
  return path.basename(_path, ext);
}

export function pathResolve(...paths: string[]) {
  return path.resolve(...paths);
}

export function pathBack(_path: string, returned = 1) {
  const basename = path.basename(_path);
  let dirname = path.dirname(_path);
  new Array(returned).fill(0).forEach(() => {
    dirname = pathJoin(dirname, '..');
  });
  return pathJoin(dirname, basename);
}
