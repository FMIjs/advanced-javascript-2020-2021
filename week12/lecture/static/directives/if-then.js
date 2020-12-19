import { directive } from '/lit-html/lit-html.js';

export const ifThen = directive((cond, html) => (part) => {
  part.setValue(cond ? html : '');
});
