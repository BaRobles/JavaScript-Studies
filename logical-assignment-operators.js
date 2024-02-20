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

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};


// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10; // 20
// rest2.numGuests = rest2.numGuests || 10; // undefined

// the code above can be written like this:
// rest1.numGuests ||= 10; // 20
// rest2.numGuests ||= 10; // undefined

// but, if numGuests do exists, however, it is assigned with 0 guests, then, the || operator will interpret it as a falsy value, assigning the value 10 to it, which will become a bug in the system...
// we can solve this using the 
// nullish assignment operator:
rest1.numGuests ??= 10; 
rest2.numGuests ??= 10;

// AND operator:
// rest2.owner = rest1.owner && '<ANONYMOUS>' // owner: undefined
// rest2.owner = rest2.owner && '<ANONYMOUS>' // owner: '<ANONYMOUS>'

rest1.owner &&= '<ANONYMOUS>' // owner: undefined
rest2.owner &&= '<ANONYMOUS>'


console.log(rest1); // numGuests: 20
console.log(rest2); // numGuests: 10