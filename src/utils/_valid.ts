export function isBlockObject(obj) {
  const type = typeof obj;
  if (type === 'undefined') {
    return true;
  }
  return type === 'object' && obj === null;
}

export function isString(obj) {
  return typeof obj === 'string';
}

export function isBoolean(obj) {
  return typeof obj === 'boolean';
}

export function isNumber(obj) {
  return typeof obj === 'number';
}

export function isObject(obj) {
  if (isBlockObject(obj)) return false;
  return typeof obj === 'object';
}

export function isArray(obj) {
  return obj instanceof Array;
}
