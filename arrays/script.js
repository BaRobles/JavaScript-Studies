// ARRAYS

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);

    // if we used beforeend, the order would be inverted: each new element, would be displayed at the end of the page!
  });
}

displayMovements(account1.movements);









/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// arrays are objects, which get access to special methods.

let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); // ["c", "d", "e"]
console.log(arr.slice(2, 4)); // ["c", "d"]
console.log(arr.slice(-2)); // ["d", "e"]
console.log(arr.slice(-1)); // ["e"]
console.log(arr.slice(1, -2)); // ["b", c"]

// creating a shallow copy:
console.log(arr.slice()); // ["a", "b", "c", "d", e"]
// also like this:
console.log([...arr]);

// SPLICE
// it works similar to slice, but it mutates the original array!
console.log('Splice:');
// console.log(arr.splice(2)); // ["c", "d", "e"]
arr.splice(-1); // this deletes 'e'
console.log(arr);
console.log('Original:');
arr.splice(1, 2); // extracts 'b' and 'c', because the second element is the number of elements you want to delete, so here we tell the computer to go to position 1 and delete 2 elements from there.
console.log(arr);
// console.log(arr); // ["a", "b"]

// REVERSE
// it mutates the original array
console.log('Reverse:');
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// CONCAT
// doesn't mutate original arrays
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// this gives the same result:
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j
// above is a string!

// THE NEW AT METHOD

const arr3 = [23, 11, 64];
console.log(arr[0]); // 23
console.log(arr.at(0)); // 23

// getting the last of the array without knowing its length
console.log(arr3[arr3.length - 1]); // 64
console.log(arr3.slice(-1)); // [64]
console.log(arr3.slice(-1)[0]); // 64
// in the above line: first extracts the last element of arr3 using arr3.slice(-1), resulting in [64]. Then, [0] is used to access the first (and only) element of this array, which is 64.
console.log(arr3.at(-1)); // 64

console.log('barbara'.at(0)); // b
console.log('barbara'.at(-1)); // a

// LOOPING ARRAYS: FOREACH


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if(movement > 0) {
    console.log(`You deposited ${movement}.`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

console.log('======================');

// doing the same thing as above, but with forEach:
movements.forEach(function(movement) {
  if(movement > 0) {
    console.log(`You deposited ${movement}.`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

// at each iteration, forEach will pass the argument to the function, which in case will be movement

// in the above for of loop, if we wanted to access the counter variable, we would do like this:
// for (const [i, movement] of movements.entries())

console.log('======================');

// to do this with the forEach:
// keep in mind that the name of the arguments doesn't matter, but their ORDER does!
movements.forEach(function(mov, index, array) {
  if(mov > 0) {
    console.log(`Movement ${index + 1}: you deposited ${mov}.`);
  } else {
    console.log(`Movement ${index + 1}: you withdrew ${Math.abs(mov)}`);
  }
});

// you cannot breakout from a forEach loop, instead, it will always loop over the entire array. So if you need to break in the middle of the loop, use the for of loop.

// FOREACH WITH MAPS:

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})
//output:
// USD: United States dollar
// script.js:193 EUR: Euro
// script.js:193 GBP: Pound sterling

// FOREACH WITH SETS:

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});

// output
// USD: USD
// script.js:204 GBP: GBP
// script.js:204 EUR: EUR
// sets do not have key, but develpers of JS decide to leave it like this in order to not confuse other developers... we could substitute key for an underscore, which in JS means a throw away variable (useless variable)
*/