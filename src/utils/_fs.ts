import fs from 'fs';
import path from 'path';
import jsonFormat from 'json-format';
import {throwError} from './_errors';

/**
 * 读取文件
 */
export function fsReadFile(_path: string) {
  try {
    return fs.readFileSync(_path).toString();
  } catch (e) {
    throwError('file read fail', e.message);
  }
}

/**
 * 写文件
 */
export function fsWriteFile(_path: string, content: string) {
  fs.writeFileSync(_path, content);
}

/**
 * 读取JSON
 */
export function fsReadJson(_path: string) {
  try {
    return JSON.parse(fsReadFile(_path));
  } catch (e) {
    throwError('file is not a JSON', e.message);
  }
}

/**
 * 写JSON
 */
export function fsWriteJson(_path: string, json: { [key: string]: any }) {
  fsWriteFile(_path, jsonFormat(json, {type: 'space', size: 2}));
}

/**
 * 读取目录
 */
export function fsReadDir(_path: string) {
  return fs.readdirSync(_path);
}

/**
 * 写目录（创建目录）
 */
export function fsWriteDir(_path: string) {
  fs.mkdirSync(_path, {recursive: true});
}

/**
 * 是否为目录
 */
export function fsIsDir(_path: string) {
  const stat = fs.statSync(_path);
  return stat.isDirectory();
}

/**
 * 是否为文件
 */
export function fsIsFile(_path: string) {
  const stat = fs.statSync(_path);
  return stat.isFile();
}

/**
 * 检测目录是否存在
 */
export function fsCheckDir(_path: string) {
  if (!fsIsDir(_path)) {
    throwError('not a dir =>', _path);
  }
}

/**
 * 检测文件是否存在
 */
export function fsCheckFile(_path: string) {
  if (!fsIsFile(_path)) {
    throwError('not a file =>', _path);
  }
}

/**
 * 复制文件
 */
export function fsCopyFile(src: string, dest: string) {
  fsWriteDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

/**
 * 复制目录
 */
export function fsCopyDir(src: string, dest: string) {
  fsCheckDir(src);
  fsCheckDir(dest);

  fsReadDir(src).forEach(dir => {
    const srcPath = path.join(src, dir);
    const destPath = path.join(dest, dir);

    if (fsIsDir(srcPath)) {
      fsCopyDir(srcPath, destPath);
    } else {
      fsCopyFile(srcPath, destPath);
    }
  });
}

/**
 * 删除文件
 */
export function fsDeleteFile(_path: string) {
  fsCheckFile(_path);
  fs.unlinkSync(_path);
}

/**
 * 删除目录
 */
export function fsDeleteDir(_path: string) {
  fsCheckDir(_path);

  fsReadDir(_path).forEach(dir => {
    const filePath = path.join(_path, dir);

    if (fsIsFile(filePath)) {
      fsDeleteFile(_path);
    } else {
      fsDeleteDir(filePath);
    }
  });

  fs.rmdirSync(_path);
}

/**
 * 清理文件的同时，忽略根目录下 .xxx 目录
 */
export function fsCleanDir(_path: string, root = true) {
  fsCheckDir(_path);

  fsReadDir(_path).forEach(dir => {
    const filePath = path.join(_path, dir);

    if (root && filePath.startsWith('.')) {
      return;
    }

    if (fsIsFile(filePath)) {
      fsDeleteFile(_path);
    } else {
      fsCleanDir(filePath, false);
    }
  });
}
