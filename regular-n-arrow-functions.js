const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function(){
    console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    const self = this; // self or that
    const isMillenial1 = function() {
      console.log(self.year >= 1981 && self.year <= 1996);
      // this below will not work, because 'this' here will be undefined. One solution is to create a variable outside of it that refers to 'this'
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    // Solution 2
    const isMillenial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    // the solution 2 works because the arrow function inherits the parent's scope 'this' keyword
    isMillenial();
  },

  greet: () => console.log(`Hey ${this.firstName}`),
  // this will throw undefined
  // this = window object
  // if there was a var variable called firstName in the global scope, 'this' here would point to it

};

jonas.greet();
jonas.calcAge();

// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
}

addExpr(2, 5);
// we can create a function with more than the arguments specified (they will not have a name, but they will exist in the arguments array of the function):
addExpr(2, 5, 6, 9, 12);
// so arguments keyword exist in regular functions

// but arguments keyword doesn't exist in arrow functions
var addArrow = (a, b) => a + b;