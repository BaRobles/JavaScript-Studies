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
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // we could keep openingHours inside here, like this:
  // openingHours: openingHours,
  // but then the name and object would have the same name, what could be a problem, so we use
  // ES6 enhanced object literals
  openingHours,

  //we can change this syntax...
/* order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },*/
  // to this:

  order(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  

  orderDelivery({
    starterIndex = 1, 
    mainIndex = 0, 
    time = '20:00', 
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients){
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};

// only the console.log would throw an error, since mon doesn't exist.
console.log(restaurant.openingHours.mon.open); 
// we have to create an if statement
if(restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open); 

  // WITH optional chaining
console.log(restaurant.openingHours.mon?.open); // it will return undefined, instead an error
//we can do this multiple times
console.log(restaurant.openingHours?.mon?.open); 

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for(const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
  // output
  // On mon, we open at closed
  // On tue, we open at closed
  // On wed, we open at closed
  // On thu, we open at 12
  // On fri, we open at 11
  // On sat, we open at 0
  // On sun, we open at closed
}

// Op. Ch. with Methods
// if order method exists, it will call it
console.log(restaurant.order?.(0,1) ?? 'Method does not exist');

// Op. Ch. with Arrays
const users = [{
  name: 'jonas', email: 'hello@gmail.com'
}];

console.log(users[0]?.name ?? 'User array empty'); // jonas

