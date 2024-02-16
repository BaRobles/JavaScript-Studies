'use strict';

function calcAge(birthYear){
  const age = 2037 - birthYear;
  
  function printAge(){
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    
    if(birthYear >= 1981 && birthYear <= 1996){
      const firstName = 'Steven';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);
// the output below is a new variable, and has nothing to do with the above one... so console.log(output) below won't work (output still will be the string above)
      const output = 'NEW OUTPUT';
//but this one will:
      // output = 'NEW OUTPUT';
    }
    console.log(output);
  }
  printAge();
  
  return age;
}
const firstName = 'Jonas';

calcAge(1991);
// console.log(age);

// Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Ba';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
// the two below won't work, because both of them are a const variable and are in the TDZ
// console.log(addExpr(2, 3));
// console.log(addArrow); // this will log undefined on console
// console.log(addArrow(2, 3));

function addDecl(a, b){
  return a + b;
}

const addExpr = function(a , b){
  return a + b;
}

//using var won't help, because varalways set to undefined by default
// const addArrow = (a, b) => a + b;
var addArrow = (a, b) => a + b;

// Example of why we shouldn't use var
if (!numProducts) deleteShoppingCart();
// the condition above will be true, and the code above will delete all products, even though there were actually products on numProducts...


var numProducts = 10;

function deleteShoppingCart(){
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

// variables declared with var will create a property on the global window object, which can create several bad consequences...