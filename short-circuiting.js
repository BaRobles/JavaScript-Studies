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


// logical operators can use ANY data type, short-circuiting

console.log("----- OR -----");
//The || operator returns the FIRST TRUTHY operand encountered, or the last operand if all operands are falsy.

console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || '' || 'Hello' || 23); // Hello

// we can use OR to set default values:
// below: if there isn't  a property numGuests it will set 10 as a default value
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10
// if we set the value first...
restaurant.numGuests = 23;
console.log(guests1); // 23


const guests2 = restaurant.numGuests || 10
console.log(guests2); // It will be 23 if the line restaurant.numGuests = 23; appears before this point, or it would be 10 if we hadn't previously set a number to numGuests.

console.log("----- AND -----");
// the logical AND operator returns the FIRST FALSY operand encountered, otherwise, it returns the last operand if all of them area truthy

console.log(0 && 'Jonas'); // 0 (falsy)
console.log(7 && 'Jonas'); // Jonas (truthy)

console.log('Hello' && 23 && null && 'jonas'); // null

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach'); // mushrooms ["spinach"]
}

// we can use AND to execute code, if the first one is true:
// if there is a function named orderPizza, then
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
