export function parseSkewerName(name: string) {
  // [_] -> -
  // [A-Z] -> [-(a-z)]
  const uppers = name.match(/([A-Z]+)/g);

  if (uppers) {
    uppers.forEach(upper => {
      if (upper.length > 1 && name.charAt(name.indexOf(upper) + upper.length) !== '-') {
        const prefixUpper = upper.substring(0, upper.length - 1);
        const suffixUpper = upper.substring(upper.length - 1, upper.length);
        name = name.replace(upper, `-${prefixUpper.toLowerCase()}-${suffixUpper.toLowerCase()}`);
      } else {
        name = name.replace(upper, `-${upper.toLowerCase()}`);
      }
    });
  }

  name = name.replace(/_/g, '-');

  if (name.startsWith('-')) {
    name = name.substring(1);
  }

  return name;
}

export function parseHumpFieldName(name: string) {
  name = parseSkewerName(name);
  const matched = name.match(/-[\w]/g);
  if (matched) {
    matched.forEach(key => {
      name = name.replace(key, key.substring(1).toUpperCase());
    });
  }
  return name;
}

export function parseHumpName(name: string) {
  name = parseHumpFieldName(name);
  return name.replace(/^\w/, name[0].toUpperCase());
}
