'use strict';

function calcAge(birthYear){
  const age = 2037 - birthYear;
  
  function printAge(){
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    
    if(birthYear >= 1981 && birthYear <= 1996){
      const firstName = 'Steven';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);
// the output below is a new variable, and has nothing to do with the above one... so console.log(output) below won't work (output still will be the string above)
      const output = 'NEW OUTPUT';
//but this one will:
      // output = 'NEW OUTPUT';
    }
    console.log(output);
  }
  printAge();
  
  return age;
}
const firstName = 'Jonas';

calcAge(1991);
console.log(age);