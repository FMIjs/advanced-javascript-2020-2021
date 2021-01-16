export function createComponent<T extends { new(): any }>(Ctor: T) {
  const instance = new Ctor();
  return instance;
}