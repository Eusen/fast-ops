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
