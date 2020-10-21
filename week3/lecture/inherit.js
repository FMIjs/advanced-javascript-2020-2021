"use strict"

const log = console.log;

// is the same, but works only when no strictmode
// global.baba = 10
// baba = 10

function myfunc() {
    // try to 'hide'the global object Math
    // var Math = {
    //     pow: function(a,b){
    //         console.log('ни работи')
    //     }
    // }

    // var global = 'baba'; // a yeah!
    log(something);
    log(myfunc.someprop);
    log(this)
    // global.myfunc();                 // todo - check why
    // isthisglobal = 10;               // will go to global.isthisglobal

    console.log(Math.pow(10,2))
    // console.log(Math.log(10,2))     // exception
    console.log(global.Math.log(10,2)) // exception
}

// save the global Math
var Math = {
    log: global.Math.log,
    pow: global.Math.pow
}

// Hide the global Math object
global.Math = Math;

// execute the function pow via object Math
log(Math.pow(20,2))

myfunc.someprop = 20;
log(myfunc.someprop);

var something = 10;
myfunc();



///////////////////////////////////////////////////////

this.prop = 20;
this.func = function fly() {
    log('eye can fleye');
};

function jtest(point) {
    // this is error in NodeJS, but works in every Browser -> quirk
    // log('my age is ' + this.prop + ' 😎😃')
    // this returns undefined in NodeJS, but works in every browser
    log('my fav. sport is ' + this.prop + ' 🤎')
    log(['(', point.x, ',', point.y, ')'].join());
}

/*

typedef struct {
    float x;
    float y;
} point;

// the mobj here is 'context' for the function
// but is not 'default' context per se.
void inspectPoint(point *mobj) {
    printf("(%d, %d)", mobj->x, mobj->y)
}

int main() {
    point mobj = { 20, 30 };
    metho(&mobj);
}

*/

// get a new function, a wrapper around jtest, 
// that will be 'bound' with certain context (seen as 'this' )
// inside the function 
var jtestWithBoundThis = jtest.bind({prop: '🚀'});
jtestWithBoundThis({x: 10.343, y:30.56});

var Cons = function() {
    var self = this;
    // super turbo ultra safe for all and backward compatable also!
    // typical approach when developing public applications/modules
    // that are going to be used by... internet audience
    if (this === undefined) {
        self = {}
    } else if (typeof Window !== 'undefined' && this === Window) {
        console.log('are you stupid?!');
        self  = {};  // autovivificate a new object/scope
    }
    self.that = ' baw ';
    self.prop = 10;

    return self;
}

var mobj = Cons();
log('the 🐶 yells -> ' + mobj.that)

function Point(x, y) {
    var somelocal = 'This is 🏠 variable'; // this variable can be looked at as being `private',
                                          // as in not visible or editable from outside via the context
                                          // + being unique for each instance
    // x || 20 ==> get the first non-falsy value ==> (x || 20) === 20; (false || true) === true; etc.
    [this.x, this.y] = [x || 20, y || 30];
    this.mine = somelocal; // now it goes into the context i.e. this -> the object
 }

// this is the structure/object
// that everything not found in 
// Point-based instances 
// will be (attempted) to be resolved into
// in case this structure has a
// non-empty __proto__ attribute/property on it's own
// the 'search' (resolution) will continue likewise
// within this 'other object' 
var confObj = {
    print:  function() {
        log([this.x, ',', this.y].join());
    },
    transpose: function(howmuch) {
        this.x = this.x / (howmuch || 10);
        this.y = this.y / (howmuch || 10);
    }
};

Point.prototype = confObj;

var p1 = new Point();
p1.print();
p1.transpose();
// lets try to change context
p1.print.bind({x: 1000, y:2200})()

function Point3d(x, y, z) {
    if (this === undefined){
    throw "called with no this!"}
    // arguments...
    // assumed here is that this is properly instantiated
    this.z = z || 30;
    Point.call(this, x, y)
}

Point3d.prototype.__proto__ = Point.prototype;

var p3d = new Point3d();
console.log(p3d.z);

var p3dManual = {};
p3dManual.__proto__ = Point3d.prototype
p3dManual.x = 10; p3dManual.y = 20;
p3dManual.print();

var pX = Object.create(Point3d.prototype)
pX.x = 3; pX.y = 14;
pX.print();

// p3d.print === Point.prototype.print
// how is the prototype inheritane working =>
// try to resolve p1.property
// try to resolve p1.__proto__.property  ( which is here p1.__proto__ => Point.prototype)
// try to resolve p1.__proto__.__proto__.property which is Point.prototype.__proto__
// p1.__proto__ === Point.prototype
// true

var p2 = new Point()
p2.print();
log(p1.print === p2.print); // would be false in case the print() method is instantiated with every object
log(p2.bind(p1).print === p1.print); // ditto

p2.x = 1000;
// p2.somelocal = 

// let a = new Cons();
// here I am *2
