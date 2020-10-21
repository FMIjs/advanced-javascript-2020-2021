function Point(x, y) {
    this.x = x;
    this.y = y    
}

var pproto = {
    print: function(a,b,c) {
        console.log('x: ' + this.x + ',' + this.y )
    }
}

var mobj = Object.create(pproto);   // var mobj = {}; mobj.__proto__ = pproto; 
mobj.x = 10;
mobj.y = 20;
mobj.print();

// pproto.print.call(mobj);

function Point3D(x,y,z) {
    Point.apply(this, arguments);
    // console.log( arguments.join(', '))
} 

Point3D.prototype = Object.create(Point.prototype);
// Point3D.prototype.__proto__ = Point.prototype;

Point3D.prototype.print = function() {
    console.log([this.x, this.y, this.z].join(', '))
};

var p3d = new Point3D(10,20,30)
p3d.print();

// Object.create - създава обект и насочва неговото __proto__ към някой друг обект, в който ще бъдат търсени всички имена (най-общо казано), които не са открити директно в обекта

// Function.call - извиква функцията с даден контекст,но с изброени един по един аргументите 
// Function.apply - извиква функцията с даден контекст, но с масив като аргументи

// Object.assign - 'слива два обекта'


// Point.prototype = Object.create(pproto)


function Parent() { 

}

function Inherit() {

}

function Serializeable() {

}

Serializeable.prototype.ser = function() {
    var serdata = '';
    var self = this;
    Object.getOwnPropertyNames(this).forEach(function(e) {
        serdata += e + '=' + self[e] + ' ';
    })
    return serdata;
}

var sobj = new Serializeable();
sobj.sekvo = "neshto";
sobj.oshte = "dwe";
sobj.ser();

Inherit.prototype = Object.create(Parent.prototype);
Inherit.prototype = Object.assign(Inherit.prototype, {
    a: 10,
    b: 20    
});

// mixin
Inherit.prototype = Object.assign(
    Inherit.prototype,
    Serializeable.prototype)

var inh = new Inherit();
inh.c = 30;
inh.d = 40;
console.log(inh.ser());

/*

Inherit.baba = function() {
    // i am not in the prototype
    // but I'm a static property of the class
    // and i look like static function!!!
}

къде ще бъде открита  inh.baba  ?

a) inh.__proto__
b) Inherit.prototype
c) Parent.prototype
d) Parent
e) Inherit
>> няма да бъде открита

*/

console.log(Object.getOwnPropertyNames(inh));
