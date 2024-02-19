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
  }
};

const arr = [7, 8, 9];

const badNewArr = [1, 2, arr[0]. arr[1]. arr[2]]; // [1, 2, 7, 8, 9]

const newArr = [1, 2, ...arr]; // [1, 2, 7, 8, 9]
console.log(newArr);
console.log(...newArr); // 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocchi'] // ["Pizza", "Pasta", "Risotto", "Gnocchi"]

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays 
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// iterables: arrays, strings, maps, sets, NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.']; 
console.log(letters);// ["J", "o", "n", "a", "s", " ", "S."]

// console.log(`${...str}`); //won't work

// Real-world example
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"), 
  prompt("Ingredient 2?"), 
  prompt("Ingredient 3?")
];

restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = {
  foundedIn: 1998,
  ...restaurant, 
  founder: 'Giuseppe'
};

console.log(restaurant); // it will log the newRestaurant with restaurant inside of it.

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano






