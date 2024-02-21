'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic', 'Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // open 24h
      close: 24,
    },
  },

  order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // destructuring the object:
  orderDelivery: function({starterIndex = 1, mainIndex = 0, time = '20:00', address}){
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`);
  }
};

//we only passed one argument to the function: one object
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// the order doesn't matter in objects, so we don't have to manually skip elements like we did in an array
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories); // this will log: 
// Classico Italiano
// {thu: ... fri...}
// ["Italian", "Pizz...]

// changing the variable names:
const {
  name: restaurantName, 
  openingHours: hours, 
  categories: tags
} = restaurant;
// this will log the same as the above
console.log(restaurantName, hours, tags); // the same as above


// Giving Empty Arrays as Default Value:
// note that we assembled attributing default values with changing the variable starterMenu's name:
const { menu = [], starterMenu: starters = []} = restaurant
console.log(menu, starters); // the default value will only apply to menu, which doesn't exist on the original object
// without the default value, menu would give an undefault value

// Mutating Variables While Destructuring Objects
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// we have to use parenthesis here, because we are starting the line with {}.
// when we do that JS expects a code block, and we can't assign anything to a code block.
// it will throw 'Unexpected token '=' error
// the trick is to use ()
({a, b} = obj); 
console.log(a, b); // 23 7

// Nested Objects
const { 
  // fri: {open, close},
  fri: {open: o, close: c},
} = openingHours;
// console.log(open, close); // 11 23
console.log(o, c); // 11 23




