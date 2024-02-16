'use strict';

console.log(this);

const calcAge = function(birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //undefined
}

calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window object
}

calcAgeArrow(1991);

const jonas = {
  year: 1991,
  calcAge: function(){
    console.log(this);
    console.log(2037 - this.year);
    // jonas.year, but it can also be any other object.year, as shown below:
  }
}

jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
//calling matilda on console will show that calcAge will also be there.

matilda.calcAge();

// if year is not defined, it will log undefined:
const f = jonas.calcAge;
f(); // undefined