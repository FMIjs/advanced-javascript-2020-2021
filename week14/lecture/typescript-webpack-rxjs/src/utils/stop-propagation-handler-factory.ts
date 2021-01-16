export function stopPropagationHandlerFactory(handler: (...args: any[]) => void, ...args: any[]) {
  return function (e: Event) {
    e.stopPropagation();
    handler(...args);
  }
}
