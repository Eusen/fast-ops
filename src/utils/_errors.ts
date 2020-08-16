export function throwError(...messages: string[]) {
  throw new Error(messages.join(' '));
}
