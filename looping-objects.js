'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // open 24h
    close: 24,
  },
}

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

};

// property NAMES
const properties = Object.keys(openingHours);
console.log(properties); // ["thu", "fri", "sat"]

// and since properties returns an array, we can use length method with it:
// console.log(`We are open on ${properties.length} days.`); // We are open on 3 days.

let openStr = `We are open on ${properties.length} days: ` 

for (const day of properties) {
  // console.log(day); // thu fri sat
  openStr += `${day},`; 
}

console.log(openStr); // We are open on 3 days: thu, fri, sat,

// Property VALUES
const values = Object.values(openingHours);
console.log(values);
// (3) [{…}, {…}, {…}]
// 0 : {open: 12, close: 22}
// 1 : {open: 11, close: 23}
// 2 : {open: 0, close: 24


// Entire object
const entries = Object.entries(openingHours);
console.log(entries);
// (3) [Array(2), Array(2), Array(2)]
// 0: 0: "thu"
//    1: {open: 12, close: 22}
// 1: 0: "fri"
//    1: {open: 11, close: 23}
// 2: 0: "sat"
//    1: {open: 11, close: 23}

// and now we can use this to loop through the object:
// note that we are using also destructuring:
for(const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}