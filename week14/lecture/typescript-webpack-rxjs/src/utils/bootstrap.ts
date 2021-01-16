import { createComponent } from "./create-component";

export function bootstrap<T extends { new(): any }>(container: HTMLElement, Ctor: T) {
  const instance = createComponent(Ctor);
  container.appendChild(instance);
}
