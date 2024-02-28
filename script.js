// Working with Strings - Part 1

const airline = 'TAP Air Portugal';
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