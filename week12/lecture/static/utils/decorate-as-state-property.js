export function decorateAsStateProperty(self, name, defaultValue) {
  self.updateState({ [name]: defaultValue });

  Object.defineProperty(self, name, {
    get() {
      const { [name]: currentValue } = self.getState();
      return currentValue;
    },
    set(newValue) {
      self.updateState({ [name]: newValue });
    }
  })
}
