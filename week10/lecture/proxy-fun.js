function factory() {

  const base = {
    ops: {},
    _exec(id) {
      console.log(this.ops[id].join('/'));
    }
  };

  function appendQuery(id, value) {
    base.ops[id] = (base.ops[id] || []).concat(value);
  }

  const p = new Proxy(base, {
    get(target, propName) {
      const id = factory.getNextId();

      appendQuery(id, propName);

      // exec this after the current stack has finished
      Promise.resolve().then(function () {
        base._exec(id);
      });

      const p2 = new Proxy({}, {
        get(target, propName) {
          appendQuery(id, propName);
          return p2;
        }
      });
      return p2;
    }
  });

  return p;
}

factory.getNextId = function () {
  if (!this.counter) { this.counter = 1; }
  return this.counter++;
};

const OBJ = factory();

const query1 = OBJ.this.is.a.super.cool.query;

query1.and.we.can.add.more;

const query2 = OBJ.hello.world;

query2.and.we.can.add.more;