const BMI = (mass, height) => {
  return mass / (height * height)
}

const massMark = 78;
const heightMark = 1.69;

const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = BMI(massMark, heightMark);
const BMIJohn = BMI(massJohn, heightJohn);
console.log(BMIMark, BMIJohn);

const markHigherBMI = () => {
  return BMIMark > BMIJohn ? true : false
}

console.log(markHigherBMI());