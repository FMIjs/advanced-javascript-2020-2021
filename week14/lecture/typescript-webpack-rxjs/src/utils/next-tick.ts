export function nextTick<T extends (...args: any[]) => void>(cb: T) {
  Promise.resolve().then(cb);
}
