import chalk from "chalk";

const messageTypeMap = {
  error: 'red',
  info: 'blue',
  warning: 'yellow',
  success: 'green',
};

export function throwError(...messages: string[]) {
  throw new Error(messages.join(' '));
}

export function renderMessage(type: 'error' | 'info' | 'warning' | 'normal' | 'success', ...message: string[]) {
  const key = messageTypeMap[type];
  return key ? chalk[key](...message) : message.join(' ');
}

export function logError(...message: string[]) {
  console.log(renderMessage("error", ...message));
}

export function logInfo(...message: string[]) {
  console.log(renderMessage("info", ...message));
}

export function logWarning(...message: string[]) {
  console.log(renderMessage("warning", ...message));
}

export function logSuccess(...message: string[]) {
  console.log(renderMessage("success", ...message));
}

export class Logger {
  static create(flag: string) {
    return new Logger(flag);
  }

  constructor(private flag: string) {
  }

  log(...message: string[]) {
    console.log(`[${this.flag}]`, ...message);
  }

  info(...message: string[]) {
    logInfo(`[${this.flag}]`, ...message);
  }

  error(...message: string[]) {
    logError(`[${this.flag}]`, ...message);
  }

  warning(...message: string[]) {
    logWarning(`[${this.flag}]`, ...message);
  }

  success(...message: string[]) {
    logSuccess(`[${this.flag}]`, ...message);
  }
}
