'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  }
}

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z); // 2 3 4
// the original array is not affected:
console.log(arr); // [2, 3, 4]

const [first, second] = restaurant.categories;
console.log(first, second); // Italian Pizzeria
// but if we want to take only the 1# and the 3# we have to leave a hole between the items:
let [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegetarian

// Switching Variables:

// using a 3rd variable
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); // Vegetarian Italian

// using destructuring:
[main, secondary] = [secondary, main]
console.log(main, secondary); // Vegetarian Italian


console.log(restaurant.order(2, 0)); // ["Garlic Bread", "Pizza"]

// destructuring...
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic Bread Pizza

// nested array
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j); // 2 [5, 6]

// destructuring inside destructuring:
const nested2 = [2, 4, [5, 6]];
const [m, , [n, o]] = nested2;
console.log(m, n, o); // 2 5 6

// default values
// const [p, q, r] = [8, 9];
// console.log(p, q, r); // 8 9 undefined

// so, we can create default values:
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8 9 1



