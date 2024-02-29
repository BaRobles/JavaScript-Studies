// Working with Strings - Part 1

const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passengerName = 'bArbARa'
const passengerLower = passengerName.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// check emails
const email = 'hello@barbara.io';
const loginEmail = ' HelLo@Barbara.Io \n';

const lowerEmail = loginEmail.toLowerCase();
// eliminating the white space:
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

// we could do this above in one step:
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail); // true

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS); // 288.97$

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); // will replace just the first one
// we can replace all 'door's:
console.log(announcement.replaceAll('door', 'gate'));

// REGULAR EXPRESSIONS

// another way of replacing all the 'door's:
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane = 'A320neo';
console.log(plane.includes('A320')); // true
console.log(plane.includes('Boeing')); // false
console.log(plane.startsWith('Air')); // false
console.log(plane.startsWith('A3')); // true

if(plane.startsWith('A3') && plane.endsWith('neo')){
  console.log('Part of the NEW Aribus family.');
}

// Practice exercise
const checkBaggage = function(items){
  const baggage = items.toLowerCase();
  if(baggage.includes('knife') || baggage.includes('gun')){
    console.log('You are NOT allowed on board.');
  } else {
    console.log('Welcome aboard.');

  }
}
checkBaggage('I have a laptop, some Food and a pocket Knife'); // You are NOT allowed on board.
checkBaggage('Socks and camera'); // Welcome aboard.
checkBaggage('Got some snacks and a gun for protection.'); // You are NOT allowed on board.

// split – splits a string into multiple parts based on a divider string
console.log('a+very+nice+string'.split('+')); // ['a', 'very', 'nice', 'string']
console.log('Barbara Robles'.split(' ')); // ['Barbara', 'Robles']

// now we can user destructuring!
const [firstName, lastName] = 'Barbara Robles'.split(' ');

const newName = ['Ms.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // Ms. Barbara ROBLES

const capitalizeName = function(name){
  const names = name.split(' ');
  const namesUpper = [];

  for(const n of names) {
  // n[0] we chopp the first letter, convert it to uppercase
  // then join it with the rest of the array
  // at each iteration we push to the array namesUpper
    // namesUpper.push(n[0].toUpperCase() + n.slice(1)); 
  // >> There is a different way to do the above!!! >>
  // below: we replace the first letter by a capitalized first letter
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  // transform the array into a string, separating each item by space:
  console.log(namesUpper.join(' '));
};

const passenger = ('jessica ann smith davis');
capitalizeName('barbara robles');

// Padding
// it means to add a number or character to a string, until it has a certain size
const message = 'Go to gate 23!';
// adding some characters to the beginning of the string.  
// we want a 25 characters long string
// and then the character that we want to use, which is '+':
console.log(message.padStart());
console.log(message.padStart(25, '+')); // +++++++++++Go to gate 23!
console.log('Barbara'.padStart(25, '+')); // ++++++++++++++++++Barbara

console.log(message.padStart(25, '+').padEnd(30, '+')); // +++++++++++Go to gate 23!+++++
// note that this will add only 5 + more
console.log('Barbara'.padStart(20, '+').padEnd(30, '+')); // +++++++++++++Barbara++++++++++
const maskCreditCard = function(number){
// another way to convert number to string:
  const str = number + ''; // + returns string
// taking the last 4 characters of the string:
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
}

console.log(maskCreditCard(34958239485738745)); // *************8744
console.log(maskCreditCard('34958239485738745')); // *************8745
console.log(maskCreditCard(34958239485)); // *******9485

// Repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function(n){
  console.log(`There are ${n} planes in line ${'🛫 '.repeat(n)}`);
}

planesInLine(5);
planesInLine(12);
planesInLine(3);



/*
//// WORKING WITH STRINGS - PART 1 
const plane = 'A320';

// we can access its elements just like an array
console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2
console.log('B737'[0]); // B

console.log(airline.length); // 16
console.log('B737'.length); // 4

// METHODS

console.log(airline.indexOf('r')); // 6
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('Portugal')); // 8
console.log(airline.indexOf('portugal')); // -1 because it can not be found on the string

// from now on, the methods mentioned here always return a NEW string, so they don't change the original one.

// position 4 is A, so its start slicing including the position given.
console.log(airline.slice(4)); // Air Portugal
// position 7 is space after Air, but the ending os the slice is never included
console.log(airline.slice(4, 7)); // 'Air'
// note that the length of the new array is 3, 7-4.

console.log(airline.slice(0, airline.indexOf(' '))); // TAP

console.log(airline.slice(airline.lastIndexOf(' '))); // ' Portugal'
// to remove the space:
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // 'Portugal'

// we can start extracting from the end:
console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function(seat) {
  // B and E are middle seats
  // taking the last character of seat:
  const s = seat.slice(-1);
  if(s === 'B' || s === 'E')
    console.log('You got the middle seat!');
  else console.log('You got lucky!');
}

checkMiddleSeat('11B'); // You got the middle seat!
checkMiddleSeat('23C'); // You got lucky!
checkMiddleSeat('3E'); // You got the middle seat!

// why can we use methods with strings? because JS transforms them into objects

console.log(new String('barbara')); // String {'barbara'}
console.log(typeof new String('barbara')); // object
console.log(typeof new String('barbara').slice(1)); // string
*/

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(50);
  console.log(output);
}
