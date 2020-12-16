function withArchive(ctor) {
  const archive = [];

  function archiveWrapper(...args) {
    ctor.apply(this, args);

    return new Proxy(this, {
      set(target, propName, value) {
        const current = { ...target };
        archive.push(current);
        return Reflect.set(target, propName, value);
      }
    });
  }

  archiveWrapper.prototype = Object.create(ctor.prototype);
  archiveWrapper.prototype.getArchive = function (idx) { return archive[idx]; };
  return archiveWrapper;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person = withArchive(Person);

const ivan = new Person('Ivan', 20);
ivan.age = 30;
const originalObject = ivan.getArchive(0);
console.log(originalObject);
ivan.name = 'TEST';
const prevObject = ivan.getArchive(1);
console.log(prevObject);
ivan.age = 40;
const lastObject = ivan.getArchive(2);
console.log(lastObject);
console.log(ivan);
