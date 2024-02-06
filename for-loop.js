const user = [
  'Joana', 
  'Smith',
  2037 - 1991, 
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];

const types = []
const typesPush = []

// printing forwards
for(let i = 0; i < user.length; i++){
  console.log(user[i], typeof user[i]);

// 2 ways of printing the data types:
  types[i] = typeof user[i];
  typesPush.push(typeof user[i]);
}

console.log(types, typesPush);

// printing backwards
for (let i = user.length - 1; i >= 0; i--){
  console.log(user[i]);
}

const years = [1991, 2007, 1969, 2020];
const ages = [];

for(let i = 0; i < years.length; i++){
  ages.push(2037 - years[i]);
}
console.log(ages)

//continue and break
console.log('------ONLY STRINGS------')
const letters = ['A', 'B', 'C', 'D', 'E', 30, 'F'];

for(let i = 0; i <letters.length; i++){
  if (typeof letters[i] !== 'string') continue;

  console.log(letters[i]);
}
console.log('------STOPS WHEN NUMBER------')
for (let i = 0; i < letters.length; i++){
  if (typeof letters[i] === 'number') break;
  console.log(letters[i]);
}

for(let exercise = 1; exercise <4; exercise++){
  console.log(`------------Starting excercise ${exercise}`)

  for (let rep = 1; rep < 6; rep++){
    console.log(`Lifting weight repetition ${rep}`);
  }
}


// ** Calculating tips **
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + tips[i]);
}

function calcAverage(arr){
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i]; 
    }
    return sum / (arr.length);
}

console.log(calcAverage(totals));

console.log('____BILLS:____')
console.log(array);
console.log('____TIPS:____');
console.log(tips);
console.log('____TOTALS:____');
console.log(totals);
console.log('____AVERAGE:____');
console.log(calcAverage(totals));

