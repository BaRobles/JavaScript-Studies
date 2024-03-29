'use strict';

// DEFAULT PARAMETERS

const bookings = [];

const createBooking = function(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers){
  // old way of setting default values:
  // numPassengers = numPassengers || 1;

  const booking = {
    flightNum,
    numPassengers,
    price,
  }
  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 3);
// skipping a default parameter:
console.log('-----');
createBooking('LH123', undefined, 1000); // it will set the default value for numPassengers


// VALUE vs. REFERENCE
const flight = 'LH234'
const client = {
  name: 'Barbara Robles',
  passport: 404385922910
};

const checkIn = function(flightNum, passenger) {
// this is not a good practice:
  flightNum = 'LH999'; 
  passenger.name = 'Ms. ' + passenger.name;

  if(passenger.passport === 404385922910){
    // alert('Check in');
    console.log('Check in');
  } else {
    // alert('Wrong passport!');
    console.log('Wrong passport!');
  }
}

checkIn(flight, client);
console.log(flight); // it won't change, although it seems it will
console.log(client); // client.name will change! to Ms...

// this happens to flight, because flight is a primitive type. And flightNum contains a copy of the VALUE, not the original value.
// it would be the same as if we right flightNum = flight (which would also be a copy)
// but client object changes because what is copied is the REFERENCE to the original value, which results in passenger pointing to the same place as client, and then, passenger will change the original object. 
// this means that we have to be careful when dealing with objects!

const newPassport = function(person){
  person.passport = Math.trunc(Math.random() * 10000000000);
}

newPassport(client);
checkIn(flight, client); // Wrong passport... this to show how problematic it can be to change objects! Because above the passport was accepted

// HIGHER-ORDER FUNCTIONS

const oneWord = function(str){
  return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str){
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}

// this is a higher-order function:
const transformer = function(str, fn){
  console.log(`Original string: ${str}`); // 
  console.log(`Transformed string: ${fn(str)}`); 

  // we call the function property 'name'
  console.log(`Transformed by: ${fn.name}`);
}

transformer('JavaScript is the best!', upperFirstWord); 
// Original string: JavaScript is the best!
// Transformed string: JAVASCRIPT is the best!
// Transformed by: upperFirstWord

transformer('JavaScript is the best!', oneWord); 
// Original string: JavaScript is the best!
// Transformed by: oneWord
// Transformed string: javascriptisthebest!

const high5 = function() {
  console.log('👋');
}

// document.body.addEventListener('click', high5)


let forEachName = ['Barbara', 'Martha', 'Adam'].forEach(high5); // 3 👋 (it will call the function high5 for each element of the array) 

// Functions returning functions

const greet = function(greeting){
  return function(name){
    console.log(`${greeting} ${name}`);
  }
}

// greet returns a function, which is 
// attributed to greeterHey, which is
// a function now!
const greeterHey = greet('Hey');
greeterHey('Jonas'); // Hey Jonas
greeterHey('Steven'); // Hey Steven

// we can do it in one line:
greet('Hello')('Jonas'); // Hello Jonas

// Functions returning functions - ARROW functions!
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greet('Hello')('Steven'); // Hello Steven


const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Barbara Robles'); // Barbara Robles booked a seat on Lufthansa flight LH239
lufthansa.book(635, 'Sebas Vassil') // John Smith booked a seat on Lufthansa flight LH635
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// what we do below is only possible because JS accepts
// first class functions.
// we take the lufthansa book function and store it
// in a variable, just so that we don't repeat the
// code in the eurowings object.
const book = lufthansa.book;

// book(23, 'Sarah Williams'); 
// above: won't work, because this is a regular 
// function, not a method, and the 'this' keyword 
// won't point to lufthansa!

// we now have to tell JS explicitly what should be the 'this' keyword

// CALL METHOD
book.call(eurowings, 23, 'Sarah Williams');
// what calls the book is the call method
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
}

book.call(swiss, 543, 'Joana Adams');
console.log(swiss);

// APPLY METHOD
// it does the same thing as the call, but it doesn't receive the list of arguments, instead, it receives an array

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// but apply is not used anymore, because we can still do this:
book.call(swiss, ...flightData);

// BIND METHOD
// it also allows to set 'this' keyword.
// but bind does not imediatly call the function, it returns a new function to which the 'this' keyword is binded.

const bookEw = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEw(44, 'Steven Williams');

// calling Ew only for flight 23
const bookEw23 = book.bind(eurowings, 23);
// and now the function only needs the name:
bookEw23('Barbara Robles');
bookEw23('Martha McCarthy');

// what we did above is called PARTIAL APPLICATION = part of arguments of the original function are already set.

// With Event Listeners

const buyPlaneBtn = document.createElement('button');
buyPlaneBtn.textContent = 'Buy Plane';
buyPlaneBtn.className = 'buy';
document.body.append(buyPlaneBtn);
buyPlaneBtn.style.width = 'auto';
buyPlaneBtn.style.height = 'auto';
buyPlaneBtn.style.padding = '10px 20px';
buyPlaneBtn.style.borderRadius = '10px';

lufthansa.planes = 300;
lufthansa.buyPlane = function(){
  console.log(this);
  this.planes++
  console.log(this.planes);
}

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane) // this won't work... because 'this' will be the html element.
// That happens because in the event handler function, the 'this' keyword always points to the element to which the handler is attached,
// eventhough in lufthansa.buyPlane the 'this' is pointing to lufthansa... solution:

// How to solve the 'this' keyword problem:
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa))
// we use bind, since it lets us define 'this', but also because it returns a function


// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// lets create a function for a tax that we apply all the time:
const addVAT = addTax.bind(null, 0.23);
// null - because here we don't have 'this' keyword
// this is how addVAT looks now:
// addVAT = value => value + value * rate;

console.log(addVAT(100));
console.log(addVAT(23));

// doing the same as above, creating a function that returns a function with the rate preset:
const addTaxRate = function(rate){
  return function(value) {
    return value + value * rate;
  }
}
const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(100));
console.log(addVAT2(23));

// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)

// function that are executed only once and immediately

const runOnce = function(){
  console.log('This will never run again.');
}
runOnce();

// we can't just write function(), so we have to
// transform the statement into an expression,
// we do this by wrapping all into ( ):
(function(){
  console.log('This will never run again.');
})();
// the last () above is there to immediately call the function!

// we can also do it with arrow functions
(() => console.log('This will ALSO never run again'))();

// for security, we can create a block to encapsulate variables:
{
  const isPrivate = 23; // cannot be accessed from outside
  var noPrivate = 46; // can be accessed from outside
}

// we no longer need to create a function for that anymore, but IIFE are still used to functions that must be executed just once.


// CLOSURES

const secureBooking = function() {
  let passengerCount = 0;

  return function(){
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  }
}

const booker = secureBooking();

booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers

// how can this be? The secureBooking function already stopped executing, but the return function keeps execution from the previous one eveytime it is called! 
// Thanks to the closure, a function does not looses conexion to the variables that existed at the function's birth place.
// The closure has priority over the scope chain!
// A closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone;
// A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// A closure makes sure that a function doesn't loose connection to variables that existed at the function's birth place.
// A closure is like a backpack that a function carries around whenever it goes. This backpack has all the variables that were present in the environment where the function was created.

// to see the scopes of booker function:
console.dir(booker); 
// check [[Scopes]] to see secureBooking function and the number that passengerCount is at the moment. 
// [[]] means that it is an internal property which we cannot access from our code.


// Example 1
let f;

const g = function(){
  const a = 23;
  f = function(){
    console.log(a * 2);
  }
}

g(); // the result of this function is that a will be 23, and f will be the function.
f(); // 46

// but let's now create another function

const h = function(){
  const b = 777;
  f = function(){
    console.log(b * 2);
  }
}

h(); // here, f will be assigned again!
f(); // 1554

console.dir(f); // we will see in the closure the value of b and no longer the value of a.

// Example 2
const boardPassengers = function(n, wait){
  const perGroup = n / 3;

  setTimeout(function(){
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, wait * 1000);


  console.log(`Will start boarding in ${wait} seconds.`);
}

const perGroup = 1000; // it won't use this one, because the closure has priority, even over the scope chain!
boardPassengers(180, 3);