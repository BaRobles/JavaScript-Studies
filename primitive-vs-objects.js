let age = 30;
let oldAge = age;
//changing age below won't affect oldAge above
age = 31;
console.log(age); // 31
console.log(oldAge); // 30

const me = {
  name: 'Jonas',
  age: 30,
};

const friend = me;
friend.age = 27;

console.log('Friend:', friend); // age: 27
console.log('Me:', me); // age: 27 also


let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('Before marriage:', jessica); // lastName: 'Davis'
console.log('After marriage:', marriedJessica); // lastName: 'Davis'

marriedJessica = {};
// this won't work, because this will change the memory in the stack, but if marriedJessica was a let, it would work

// copying objects
const jess = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27
};

// this will merge jess with a new empy object, and this will make jess to point to another address in the stack
const jessCopy = Object.assign({}, jess);
jessCopy.lastName = 'Davis';

console.log('Before marriage:', jess); // lastName: 'Williams'
console.log('After marriage:', jessCopy); // lastName: 'Davis'

// however this technique only works on the first level. If we have an object inside, it will still point to the same place. It won't create a deep clone.

const jess2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessCopy2 = Object.assign({}, jess2);
jessCopy2.lastName = 'Davis';

jessCopy2.family.push('Mary');
jessCopy2.family.push('John');

// the push will change both instead of only the copy:
console.log('Before marriage:', jess2); // family: Alice, Bob, Mary, John
console.log('After marriage:', jessCopy2); // family: Alice, Bob, Mary, John