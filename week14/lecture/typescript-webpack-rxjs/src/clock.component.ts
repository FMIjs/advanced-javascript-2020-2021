import { customElement, html, LitElement, property } from "lit-element";
import { interval, Subscription } from "rxjs";
import { first, switchMap, startWith, map } from 'rxjs/operators';

@customElement('clock-component')
export class ClockComponent extends LitElement {

  subscription!: Subscription;

  @property() time!: string;

  connectedCallback() {
    super.connectedCallback();
    const currentDate = new Date();
    const sec = currentDate.getSeconds();

    const source$ = interval((60 - sec) * 1000).pipe(
      first(),
      switchMap(() => interval(60000).pipe(startWith(null))),
      startWith(null),
      map(() => {
        const now = new Date();
        let hour: number | string = now.getHours();
        let minutes: number | string = now.getMinutes();
        if (hour < 9) { hour = `0${hour}`; }
        if (minutes < 9) { minutes = `0${minutes}`; }
        return `${hour}:${minutes}`;
      })
    );

    this.subscription = source$.subscribe(time => this.time = time);
  }

  render() {
    return html`
      <div>The time is: ${this.time}</div>
    `
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.subscription.unsubscribe();
  }

}
