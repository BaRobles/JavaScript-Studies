'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
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

  // we imediatly destructure the object:
  // we can also give default values
  orderDelivery: function({
    starterIndex = 1, 
    mainIndex = 0, 
    time = '20:00', 
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function(mainIngredient, ...otherIngredients){
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};

// Rest Pattern and Parameters
// it is the opposite of spread. It packs elements into an array

// 1. Destructuring
// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of = 
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]

// the rest element must be the last one
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];

console.log(pizza, risotto, otherFood); // Pizza Risotto ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // thu: {...} fri: {...}
// This will display the opening hours for weekdays (Thursday and Friday in this case) excluding Saturday, as extracted using object destructuring.

// 2. Functions
const add = function(...numbers){
  console.log(numbers);
}

add(2, 3) // [2, 3]
add(5, 3, 7, 9) //[5, 3, 7, 9]
add(8, 4, 3, 5, 5, 6, 7) // [8, 4, 3, 5, 5, 6, 7]

const add2 = function(...numbers){
  let sum = 0;
  for(let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
}

add2(2, 3)
add2(5, 3, 7, 9) // 24
add2(8, 4, 3, 5, 5, 6, 7) //38

const x = [23, 5, 7];
// calling the array above:
// here o pac the values and in the function, we unpac them.
add2(...x); // 35

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); // mushrooms ["onion", "olives", "spinach"]

restaurant.orderPizza('mushrooms'); // mushrooms







