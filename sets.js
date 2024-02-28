// Setts is a collection of unique values (so it can never have a duplicate)
// it is good to eliminate duplicates

// the parameter must be an iterable
const orderSet = new Set([
  'Pizza', 
  'Pasta',
  'Risotto',
  'Risotto',
  'Pizza', 
  'Pasta',
  'Risotto',
]);

console.log(orderSet); 
// Set 
// 0: "Pizza" 1: "Pasta" 2: "Risotto"
// no repeated values
// sets are iterables
// the order is irrelevant

console.log(new Set('Barbara'));
// "B", "a", "r", "b"

console.log(orderSet.size); // 3
// don't confuse with length, used in arrays
// has method is similar to includes method in arrays
console.log(orderSet.has('Pizza')); // true
console.log(orderSet.has('Bread')); // false


// adding elements to a set
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
console.log(orderSet); 
// 0: "Pizza" 1: "Pasta" 2: "Risotto" 3: "Garlic Bread"

orderSet.delete('Risotto');
console.log(orderSet); 
// 0: "Pizza" 1: "Pasta" 2: "Garlic Bread"

// cleaning the set:
// orderSet.clear(); 

// looping over a set:
for (const order of orderSet) console.log(order);

// Example of use:
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// using spread to build an array with the values:
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
// ['Waiter', 'Chef', 'Manager']

// getting the size of the set:
console.log(new Set([
  'Pizza', 
  'Pasta',
  'Risotto',
  'Risotto',
  'Pizza', 
  'Pasta',
  'Risotto',
]).size); // 3

console.log(new Set('barbararobles').size); // 7

