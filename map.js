// Map is a data structure to store values in keys
// the difference from objects is that in maps we can have
// any type of data as a key, as in objects, it must be a string.

const rest = new Map();

// adding data to the map
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
// 0: {"name" => "Classico Italiano"}
// 1: {1 => "Firenze, Italy"}
// 2: {2 => "Lisbon, Portugal"}

// chaining set method
rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

  console.log(rest. get('name'));
  console.log(rest. get(true));

  // reading data from the map >> Get Method

  console.log(rest.get('name')); // Classico Italiano
  console.log(rest.get(true)); // We are open :D
  console.log(rest.get('true')); // undefined 

  // getting the information of wether the restaurant is open or not using the Get Method
  const time = 21;
  
  console.log(rest.get(time > rest.get('open') && time <  rest.get('close'))); // We are open :D

  // checking if a map has a certain key

  console.log(rest.has('categories')); // true
  rest.delete(2); // deletes the info at key 2
  // rest.clear();
  console.log(rest);
  console.log(rest.size); // 7

  // Using arrays or objects as map keys

  // rest.set([1, 2], 'Test');
  // console.log(rest);
  // console.log(rest.size); 

// console.log(rest.get([1, 2])); // won't work, because the array here is not the same as the above.
// we solve this by creating a variable that stores the value, and then we point the variable

const arr = [1, 2];
// and now we pass the variable:
rest.set(arr, 'Test');
// we can use an object from the DOM also:
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size); 

console.log('Here');
console.log(rest.get(arr));

// Map Interation
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);

console.log(question);

// the array of arrays structure is the same structure that we see when we call: Object.entries());
// this means you can write a new Map giving as a parameter the entries of an object:
// const hoursMap = new Map(Object.entries(openingHours));


console.log(question.get('question'));
// each item of question will have both key and value, so we already destructure here:
for (const [key, value] of question){
  // we only want to print the info that has a number as key
  if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer:'));
const answer = 3;
console.log(answer);

// since this is true, we can plug it directly into the map:
// question.get('correct') === answer
// so the first get below will get the message stored in the key with the value true
console.log(question.get(question.get('correct') === answer));

// convert map to array (doesn't make sence in this case)
console.log(...question);
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);

