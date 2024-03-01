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


['Barbara', 'Martha', 'Adam'].forEach(high5); // 3 👋 (it will call the function high5 for wach element of the array) 

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


