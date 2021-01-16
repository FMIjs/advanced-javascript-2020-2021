export function preventDefaultHandlerFactory(handler: (...args: any[]) => void, ...args: any[]) {
  return function (e: Event) {
    e.preventDefault();
    handler(...args);
  }
}
