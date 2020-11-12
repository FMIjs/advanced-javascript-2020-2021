// THIS IS A SIMPLE IMPLEMENTATION OF A PROMISE CONTAINER (something that we already have in ES6)
// THIS IS JUST AN EXAMPLE AND IT SHOULD BE USED ONLY FOR **DEMONSTRATION PURPOSES**

const PROMISE_STATES = {
  PENDING: 'p',
  RESOLVED: 'res',
  REJECTED: 'rej'
};

function Promis(fn) {
  this._next = null;
  this._successHandler = null;
  this._failureHandler = null;
  this._state = PROMISE_STATES.PENDING;
  this._value = null;
  this._fn = fn;
  if (fn) { fn(this.resolve.bind(this), this.reject.bind(this)); }
}

Promis.resolve = function (value) {
  const p = new Promis();
  p._state = PROMISE_STATES.RESOLVED;
  p._value = value;
  return p;
};

Promis.reject = function (value) {
  const p = new Promis();
  p._state = PROMISE_STATES.REJECTED;
  p._value = value;
  return p;
};

Promis.prototype.then = function (successHandler, failureHandler) {
  this._successHandler = successHandler;
  this._failureHandler = failureHandler;
  this._next = new Promis();
  return this._next;
};

Promis.prototype._processNext = function () {
  const next = this._next;
  if (!next) { return; }
  if (
    this._state === PROMISE_STATES.PENDING ||
    (next._state === PROMISE_STATES.PENDING && !!next._fn)
  ) { return; }

  if (
    (
      this._state === PROMISE_STATES.RESOLVED &&
      next._state === PROMISE_STATES.PENDING
    ) ||
    next._state === PROMISE_STATES.RESOLVED
  ) {
    next.resolve(next._value || this._value);
    return;
  }

  if (
    (
      this._state === PROMISE_STATES.REJECTED &&
      next._state === PROMISE_STATES.PENDING
    ) ||
    next._state === PROMISE_STATES.REJECTED
  ) {
    next.reject(next._value || this._value);
    return;
  }
}

Promis.prototype.resolve = function (value) {
  this._value = value;
  this._state = PROMISE_STATES.RESOLVED;
  process.nextTick(() => {
    let autoProcess = false;
    if (this._successHandler) {
      let result = this._successHandler(value);
      if (!(result instanceof Promis)) {
        autoProcess = true;
        result = Promis.resolve(result);
      }
      result._next = this._next;
      this._next = result;
    }
    if (autoProcess || !this._successHandler) { this._processNext(); }
  });
};

Promis.prototype.reject = function (value) {
  this._value = value;
  this._state = PROMISE_STATES.REJECTED;
  process.nextTick(() => {
    let autoProcess = false;
    if (this._failureHandler) {
      let result = this._failureHandler(value);
      if (!(result instanceof Promis)) {
        autoProcess = true;
        result = Promis.resolve(result);
      }
      result._next = this._next;
      this._next = result;
    }
    if (autoProcess || !this._failureHandler) { this._processNext(); }
  });
};

const p = new Promis(function (resolve) {
  setTimeout(() => resolve(10), 1000);
})
  .then(
    function (x) {
      console.log('First success handler (should enter and succeed)', x);
      return x + 10;
    }, function (err) {
      console.error('First error handler (should not enter)', err);
      return Promis.reject(err);
    }
  )
  .then(
    function (x) {
      console.log('Second success handler (should enter and reject)', x);
      return new Promis(function (resolve, reject) {
        reject(new Error('TEST'));
      })
    },
    function (err) {
      console.log('Second error handler (should not enter)', err);
      console.error(err);
      return Promis.reject(err);
    }
  )
  .then(
    function (x) {
      console.log('Third success handler (should not enter)', x);
      return x;
    },
    function (err) {
      console.log('Third error handler (should enter and resolve)', err);
      return 100;
    }
  )
  .then(
    function (x) {
      console.log('Fourth success handler (should enter and resolve async)', x);
      return new Promis((resolve) => {
        setTimeout(() => resolve(2000), 1000);
      });
    },
    function (err) {
      console.log('Fourth error handler (should not enter)', err);
    }
  )
  .then(
    function (x) {
      console.log('Fifth success handler (should enter and async reject)', x);
      return new Promis((resolve, reject) => {
        setTimeout(() => reject(new Error(x)), 1000);
      });
    },
    function (err) {
      console.log('Fifth error handler (should not enter)', err);
    }
  ).then(
    function (x) {
      console.log('Sixth success handler (should not enter)', x);
      return 2020;
    },
    function (err) {
      console.log('Sixth error handler (should enter and finish)', err);
    }
  );