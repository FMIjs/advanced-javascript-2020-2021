import { render } from '/lit-html/lit-html.js';

function getUpdateStateFn(state) {
  return function updateState(updates) {
    const currentState = state.get(this);
    state.set(this, { ...currentState, ...updates });
    this.updateTemplate();
  };
}

export function decorateAsComponent(self, templateFn) {
  const state = new WeakMap();

  self.isUpdateScheduled = false;

  function updateTemplate() {
    if (this.isUpdateScheduled) { return; }
    this.isUpdateScheduled = true;
    Promise.resolve().then(() => {
      render(templateFn(this), this.shadowRoot);
      this.isUpdateScheduled = false;
    })
  };

  self.updateState = getUpdateStateFn(state).bind(self);
  self.getState = function () { return state.get(self); }
  self.updateTemplate = updateTemplate.bind(self)
  self.updateTemplate();

  return self;
}
