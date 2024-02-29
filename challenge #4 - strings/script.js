// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// document.body.append(document.createElement('textarea'));

// const button = document.createElement('button');

// button.textContent = 'Click me';
// document.body.append(button);


const button = document.querySelector('button');

button.addEventListener('click', function(){
  const text = document.querySelector('textarea').value;
  const textLower = text.toLowerCase();
  const array = textLower.split('\n');
  let i = 1;
  for (const a of array){
    let words = a.trim();
    if(words.includes('_')){
      const [firstHalf, secondHalf] = words.split('_');
      const camelCase = `${firstHalf}${secondHalf[0].toUpperCase()}${secondHalf.slice(1)}`
      console.log(`${camelCase.padEnd(20)} ${'✅'.repeat(i)}`);  
      i++;
    }
  }
});

// instructor's solution:

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const rows = text.split('\n');

// // The entries() method is called on the array to get an iterator that returns both the index (i) and the value (row) of each element.
//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split('_');

//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
//   }
// });

