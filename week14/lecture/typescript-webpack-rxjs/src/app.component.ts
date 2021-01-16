import { customElement, html, LitElement, property, query, unsafeCSS } from "lit-element";
import { repeat } from 'lit-html/directives/repeat';
import { ClockComponent } from "./clock.component";
import { APIUrl } from "./constants";
import { IUser, IPost } from "./interfaces";
import { nextTick, createComponent, stopPropagationHandlerFactory } from "./utils";
import { fromEvent, of, from, Subscription, BehaviorSubject, asyncScheduler, interval, merge, combineLatest } from 'rxjs';
import { debounceTime, delay, map, mapTo, mergeMap, shareReplay, startWith, switchMap, tap } from "rxjs/operators";

// const original = history.pushState;

// history.pushState = function(...args) {
//   window.location.pathname
//   original.call(this, ...args);
//   const instance = document.querySelector(selector)
//   instance.state = {};
// }

function runTest() {
  const data = Array.from({​​​​​length: 100}​​​​​, () => Math.floor(Math.random() * 40));
  const source$ = interval(1000).pipe(
    map(i => i + 1), 
    startWith(0), 
    map(idx => data[idx]),
    shareReplay()
  );
  
  source$.subscribe((data) => console.log('sub1', data));
  
  setTimeout(() => {
    source$.pipe(
      map((item) => data.length >= item)
    ).subscribe((data) => console.log('sub2', data));
  }, 2000);
}

// runTest();

@customElement('app-component')
export class AppComponent extends LitElement {

  @query('#search') searchInput!: HTMLInputElement;

  @property() users: IUser[] = [];
  @property() posts: IPost[] = [];
  @property() selectedUser: IUser | null = null;
  @property() isLoadingUsers = false;
  @property() isLoadingPosts = false;

  subscription = new Subscription();

  router = {
    '/': 'HOME',
    '/about': 'ABOUT'
  }

  content!: string;

  private _selectedUser = new BehaviorSubject<null | IUser>(null);
  selectedUser$ = this._selectedUser.asObservable();

  connectedCallback() {
    super.connectedCallback();

    this.navigateTo(window.location.pathname);

    document.addEventListener('click', this.documentClickHandler);

    nextTick(() => {
      const searchInputSub = fromEvent(this.searchInput, 'keyup')
        .pipe(
          debounceTime(300),
          mapTo(this.searchInput),
          map(el => el.value),
          startWith(undefined),
          tap(() => this.isLoadingUsers = true),
          mergeMap(search => this.loadUsers(search))
        )
        .subscribe(users => {
          this.isLoadingUsers = false;
          this.users = users;
        });

      this.subscription.add(searchInputSub);

      const selectedUserSub = this.selectedUser$.pipe(
        tap(() => this.isLoadingPosts = true),
        mergeMap(selectedUser => selectedUser ? this.loadUserPosts(selectedUser.id) : [[]])
      ).subscribe(posts => { 
        this.isLoadingPosts = false;
        this.posts = posts 
      })

      this.subscription.add(selectedUserSub);
    })
  }

  documentClickHandler = (e: MouseEvent) => {
    this.selectedUser = null;
    this._selectedUser.next(null);
  }

  navigateTo = (path: string) => {
    this.content = (this.router as any)[path];
    history.pushState(null, '', path);
  }

  componentClickHandler(e: MouseEvent) {
    if((e.target as HTMLElement)?.tagName === 'A') { 
      e.preventDefault(); 
      this.navigateTo((e.target as HTMLAnchorElement).pathname);
    }
  } 

  loadUsers(search?: string): Promise<IUser[]> {
    let url = `${APIUrl}/users`;
    if (search) { url += `?name_like=${search}`; }
    return fetch(url).then(res => res.json());
  }

  loadUserPosts(userId: number): Promise<IPost[]> {
    const url = `${APIUrl}/posts?userId=${userId}`;
    return fetch(url).then(res => res.json());
  }

  toggleUser = (user: IUser): void => {
    if (this.selectedUser === user) {
      this.selectedUser = null;
      this._selectedUser.next(null);
      return;
    }
    this.selectedUser = user;
    this._selectedUser.next(user);
  }

  render() {

    const userPosts = this.selectedUser ? html`
      <div>Posts:</div>
      ${this.isLoadingPosts ? 
        'LOADING POSTS...' : html`<ul>
        ${repeat(this.posts, p => p.id, (post) => html`<li>${post.title}</li>`)}
      </ul>`}
      ` : '';

    return html`
    <div @click=${this.componentClickHandler}>
      <nav>
        <a href="/" is="router-nav">HOME</a>
        <a href="/about" is="router-nav">ABOUT</a>
      </nav>
      ${this.content}
      <div>RXJS/TS/Webpack (TS -> ES6)</div>
      <div>${createComponent(ClockComponent)}</div>
      <div>
        <label for="search">Filter</label>
        <input id="search" type="text">
      </div>
      <div>Users:</div>
      ${this.isLoadingUsers ? 'LOADING USERS...' : html`<ul>
        ${repeat(this.users, u => u.id, (user) => html`<li @click=${stopPropagationHandlerFactory(this.toggleUser, user)}>
          ${user.name}</li>`)}
      </ul>`}
      <div>Selected user: ${this.selectedUser?.name || 'none'}</div>
      ${userPosts}
    </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.documentClickHandler);
    this.subscription.unsubscribe();
  }
}
