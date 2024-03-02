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

document.body.addEventListener('click', high5)


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
