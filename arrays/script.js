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


const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
// creating a mechanism to set ascending and descending order for the movements array
// in the condition below, we check if sort parameter is true or false
// slice here is to create a copy of movements, because we don't want to modify the original array
  const movs = sort ? movements.slice('').sort((a, b) => a - b) : movements;
// this above is related to to the btnSort button event listener

  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);

    // if we used beforeend, the order would be inverted: each new element, would be displayed at the end of the page!
  });
}

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
console.log('===== CALC DISPLAY');



const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map( name => name[0] )
    .join('');
  })
};

// we do not return anything from the forEach because it already produces a side effect.
console.log('====');
createUsernames(accounts);
console.log(accounts); // we will see the property username in accounts objects!


// console.log(createUsernames('Steven Thomas Williams')); // username: stw

// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map( name => name[0] )
//   .join('');
// toLowerCase returns a string
// the split method returns an array, and we will use the map method to loop over it and get the initials.
// since the result of this will be an array ['s', 't', 'w'], we can call the join method, which will result in stw.
// above is the same as:
// .map(funciton(name){
//   return name[0];
// });


const updateUI = function(acc){
  // Display movements
  displayMovements(acc.movements)

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc)
}

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function(e){
  // this will prevent the form from submiting
  e.preventDefault(); 
  console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LLLLL');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update user interface
    updateUI(currentAccount);  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if(
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // update user interface
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
});


// ********** FIND INDEX METHOD ***********
// it returns the index of the first element in the array that matches the condition
// indexOf() also returns an index, but this method can only search for the value contained on the array.
// on findIndex, on the other hand, we can create a more complex condition (ex. element > 25)
// so we are not as limited as in indexOf()
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  
  if(
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username);
      console.log(index);
      
      // delete account
      accounts.splice(index, 1);
      containerApp.style.opacity = 0;
  };
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
// if it is false, then it should be true, that's why we are using !sorted
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});





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

// *********** SPLICE ***********
// it works similar to slice, but it mutates the original array!
console.log('Splice:');
// console.log(arr.splice(2)); // ["c", "d", "e"]
arr.splice(-1); // this deletes 'e'
console.log(arr);
console.log('Original:');
arr.splice(1, 2); // extracts 'b' and 'c', because the second element is the number of elements you want to delete, so here we tell the computer to go to position 1 and delete 2 elements from there.
console.log(arr);
// console.log(arr); // ["a", "b"]

// *********** REVERSE ***********
// it mutates the original array
console.log('Reverse:');
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

// *********** CONCAT ***********
// doesn't mutate original arrays
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// this gives the same result:
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j
// above is a string!

// ********* THE NEW AT METHOD ************

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

// ********* LOOPING ARRAYS: FOREACH METHOD ************


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if(movement > 0) {
    console.log(`You deposited ${movement}.`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

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

// ********* FOREACH WITH MAPS ***********
// the map() method is used to create a new array by applying a function to each element of an existing array.

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  // console.log(`${key}: ${value}`);
})
//output:
// USD: United States dollar
// script.js:193 EUR: Euro
// script.js:193 GBP: Pound sterling

// *********** FOREACH WITH SETS ***********

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});

// output
// USD: USD
// script.js:204 GBP: GBP
// script.js:204 EUR: EUR
// sets do not have key, but develpers of JS decide to leave it like this in order to not confuse other developers... we could substitute key for an underscore, which in JS means a throw away variable (useless variable)


///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/



// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// console.log(juliasCopy);


// const checkDogs = function(dogsJulia, dogsKate) {
//   const juliasCopy = dogsJulia.slice(1, -2);
//   const totalDogs = [...juliasCopy, ...dogsKate]
//   totalDogs.forEach(function(age, i) {
//     if(age < 3) {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶"`);
//     } else {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
//     }
//   });
// }



// instructor's solution:

const checkDogs = function(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  dogs.forEach(function(dog, i) {
    if(dog <= 3) {
      // console.log(`Dog number ${i + 1} is still a puppy 🐶"`);
    } else {
      // console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    }
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('========================');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// let calcAverageHumanAge = function(array){
//   const adultDogs = array
//     .filter((age) => age > 2)
//     .map((age) => 16 + age * 4)
//     .filter((age) => age >= 18);
  
//   console.log('ADULT DOGS ARRAY');
//   console.log(adultDogs);

//   const babyDogs = array
//     .filter((age) => age <= 2)
//     .map((age) => age * 2);

//   let average = adultDogs.reduce((acc, cur) =>  acc + cur, 0);
//   average = average / adultDogs.length;
//   console.log(average);
// }

// instructor's solution:
// const calcAverageHumanAge = function(ages) {
//   const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4 );
//   const adults = humanAges.filter(age => age >= 18);
//   // console.log(humanAges);
//   // console.log(adults);
//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  
//   // other way of calculate average
//   const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return average;
// }

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = ages => 
  ages
    .map(age => age <= 2 ? 2 * age : 16 + age * 4 )
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);


const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

console.log('=====================');



// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.


GOOD LUCK 😀
TEST DATA:
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// let recommendedFood;
console.log('The recommended food is:');

const foodCalc = function(dogs){
  dogs.forEach(function(dog) {
    dog.recommendedFood = dog.weight ** 0.75 * 28;
  })
}
foodCalc(dogs);
console.log(dogs);


// console.log(dogs[2].owners[0]);
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahsDog);


if(sarahsDog.curFood < sarahsDog.recommendedFood * 0.9){
  console.log('Sarah\'s Dog is eating too little!');
} else if (sarahsDog.curFood > sarahsDog.recommendedFood * 1.10) {
  console.log('Sarah\'s Dog is eating too much!');
}

let ownersEatTooMuch;
let ownersEatTooLittle;
ownersEatTooMuch = dogs
  .map(dog => {
    if(dog.curFood > dog.recommendedFood){
      return dog.owners
    } 
  })
  .filter(owners => owners !== undefined);

console.log(ownersEatTooMuch);
console.log(dogs.map(dog => dog.curFood < dog.recommendedFood));





// *************************************************************

// DATA TRANSFORMATIONS WITH MAP, FILTER AND REDUCE

// MAP = similar to forEach method, but with the difference that it creates a new array. It takes an array, loops over it, and at each iteration applies a callback function to it.

// MAP x FOREACH = forEach creates side effects, it returns each element, one by one. But map returns an array with everything.

// FILTER = it also returns a new array. It is used to filter elements on the original array which satisfies certain conditions

// REDUCE = boils down all array elements to one single value (e.g. adding all elements together). There is no new array, just a value.

const eurToUsd = 1.1;

// we have to call the own array as a parameter (mov here)
// const movementsUSD = movements.map(function(mov){
//   return mov * eurToUsd;
//   // return 32 would output [23, 23, 23, 23, 23...]
// });

// we can write the above like this:

const movementsUSD = movements.map(mov => mov * eurToUsd); 
// removed the parenthesis, since there is only onw parameter;
// removed curly brackets and return, since there is only one line of code



// console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movementsUSD); // [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]


// doing the same thing as MAP but with for of
const movementsUSDfor = [];
for(const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// MAP is more suitable for a functional programming, and it is more modern.

// just like the forEach method, the map also has access to the same parameters: values, index and the whole array.

const movementsDescriptions = movements.map((mov, i) =>
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
    mov
  )}.`
);

// console.log(movementsDescriptions);

// output:
// ['Movement 1: you deposited 200.', 'Movement 2: you deposited 450.', 'Movement 3: you withdrew 400', 'Movement 4: you deposited 3000.', 'Movement 5: you withdrew 650', 'Movement 6: you withdrew 130', 'Movement 7: you deposited 70.', 'Movement 8: you deposited 1300.']

// ******** FILTER METHOD ********

// we want to filter the negative values!
const deposits = movements.filter(function(mov){
  return mov > 0;
});

// console.log('MOVEMENTS');
// console.log(movements);
// console.log(deposits); // will print only the positive values!

// doing the same thing with for of loop:
// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// the advantage of using filter is that it we can chain various methods together.

const withdrawals = movements.filter(mov => mov < 0 );

// console.log(withdrawals);

// ******* REDUCE METHOD *******
console.log(movements);
// parameters: accumulated, current, index, array
// const balance = movements.reduce(function(acc, cur, i, arr){
//   console.log(`Iteration number ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// the 0 is where we want to start counting

const balance = movements.reduce((acc, cur) =>  acc + cur, 0);

// console.log(balance);

// doing the same thing with for of loop
// let balance2 = 0;
// for(const mov of movements) balance2 += mov;
// console.log(balance2);

// GETTING THE MAXIMUM VALUE OF THE MOVEMENTS ARRAY WITH REDUCE **************


const max = movements.reduce((acc, mov) => acc < mov ? mov : acc, movements[0]);

// don't use 0 here!

// CHAINING METHODS
// taking all the movement deposits, convert them to US dolars and sum them up:

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// be aware of what each method returns!

// ********** FIND METHOD ***********
// retrieves an element of an array based on a condition
// it will return the FIRST element that satisfies the condition
// it is useful to find an object inside an array
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); // will get only the object where Jessica Davis appears as an owner!

// the same thing with for of
for(const a of accounts) {
  // if (a.owner === 'Jessica Davis')
  //   console.log(a);
  (a.owner === 'Jessica Davis') && console.log(a);
}

// ********** SOME AND EVERY ***********

console.log(movements);
// includes checks only for equality
console.log(movements.includes(-130));

// SOME
// some allows us to use conditions!
const anyDeposits = movements.some(mov => mov > 1500)
console.log(anyDeposits);

// EVERY
console.log(movements.every(mov => mov > 0)); // false
// console.log(account4.movements.every(mov => mov > 0)); // true

// Separate callback

const deposit = mov => mov > 0;
console.log(account4.movements.every(deposit)); // true
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300]

const arraay = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arraay.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]
// it only goes ONE level deep when flatening the array.
// if there were another array inside the nested arrays above, it would NOT flaten it!
const arrDeep = [[1, [2, 3]], [[4, 5], 6], 7, 8];
// we can solve this by using the depth argument:
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]
// the two in the method means it has to go 2 levels

// using flat in the bakist app
// first we create an array only with movements:
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements); // an array of movements

// const allMovements = accountMovements.flat();
// const overalBalance = allMovements.reduce((acc, mov) =

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance);
// using a map and then flat, is a pretty common opperation.
// there is another method that combines both into one method, which is better for performance!

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance2);
// notice that the flatMap only goes one level deep!


// ******* SORTING ARRAYS *******

// with strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']
// this actually mutates original array

// numbers
console.log(movements);
console.log(movements.sort()); // is not ordered, because the sort treats the values as strings... so the numbers will the ordered 'alphabetically' so  the - is the first, then 1, 2... 
// how to solve this:
// ascending order:
movements.sort((a, b) => {
  if(a > b) return 1 // switches the order
  if (b > a) return -1 // keeps oder
});
// a = current value
// b = next value

// return < 0 (keep order)
// return > 0 (switch order)
console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]


// descending order:
movements.sort((a, b) => {
  if(a > b) return -1
  if (b > a) return 1
});
console.log(movements); // [3000, 1300, 450, 200, 70, -130, -400, -650]

// but, since we are trying to figure out which is greater than which, a > b would also means that a - b would return a positive value. And a - b would return a negative value. So we can write things like this:
// ascending
movements.sort((a, b) => a - b );
console.log(movements);

// descending
movements.sort((a, b) => b - a );
console.log(movements);

// ***** WAYS OF CREATING AND FILLING ARRAYS ******
const x = new Array(7);
console.log(x.map(() => 5)); // [empty × 7]

// x.fill(1);
// console.log(x); // [1, 1, 1, 1, 1, 1, 1]
// x.fill(1, 3);
// console.log(x); // [empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5);
console.log(x); // [empty × 3, 1, 1, empty × 2]

// we can mutate arrays:
const arraaay = [1, 2, 3, 4, 5, 6, 7];
arraaay.fill(23, 2, 6);
console.log(arraaay); // [1, 2, 23, 23, 23, 23, 7]

// ********* ARRAY.FROM **********
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1)
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// dice rolling array
const dice = Array.from({ length: 7}, () => Math.floor(Math.random() * 6 + 1))
console.log(dice);

// let's say we don't have the values in movements in an array and want to sum them.
// let's put them together in an array:

labelBalance.addEventListener('click', function (){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // another way to convert a NodeList to an array is using spread, but in this case we would have to apply map method separatly
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')]
});

// the querySelector above is to call the elements we want to convert in an array

// ******** ARRAY METHODS PRACTICE ********

// 1. 
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2. 
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000)
//   .length;

// doing the same thing using reduce
// using reduce to count something in an array:
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => cur >= 1000 ? count + 1 : count, 0)
  .reduce((count, cur) => cur >= 1000 ? ++count : count, 0) // count++ won't work, because it increases the count, but it still returns the old value!

console.log(numDeposits1000);

// 3.
// we could destructur the values immediately also:
// ({deposits, withdrawals} = accounts
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
    sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
    return sums;
  }, 
  {deposits: 0, withdrawals: 0})

console.log(sums); // {deposits: 25180, withdrawals: -7340}
// console.log(deposits, withdrawals);

// {deposits: 0, withdrawals: 0} we start with an object, since we want to return one

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function(title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => 
      exceptions.includes(word) ? word : capitalize(word))
    .join(' ');
  
// we create capitalize to ensure that the first word does not comes with lower case, in case it is one of the execptions:
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title, but no too long'));
console.log(convertTitleCase('and here is another title, with an EXAMPLE'));



