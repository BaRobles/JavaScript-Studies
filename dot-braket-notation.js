const ba = {
  firstName: 'Ba',
  lastName: 'Robles',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Joana', 'Lara', 'Sebas']
};

console.log(ba);

console.log(ba.lastName); // Schmedtmann
console.log(ba['lastName']); // Schmedtmann

// the difference between the dot and braket is that in the braket notation, we can put inside the brakets any expression that we like.

const nameKey = 'Name';
console.log(ba['first' + nameKey]); // ba
console.log(ba['last' + nameKey]); // Schmedtmann

// using prompt inside brakets

const interestedIn = prompt('What do you want to know about Ba? Choose between firstName, lastName, age, job, and friends.')
console.log(ba[interestedIn]); // we wouldn't be able to do this with dot notation!

if(ba[interestedIn]) {
  console.log(ba[interestedIn]);
} else {
  console.log('Wrong request! Choose firstName, lastName, age, job, and friends.');
}

// adding properties to the object using dot and brakets notations:
ba.location = 'España';
ba['twitter'] = '@barobles';
console.log(ba);


const phrase = `${ba.firstName} has ${ba.friends.length} friends, and his best friend is called ${ba.friends[0]}.`

console.log(phrase);