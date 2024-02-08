let calcAverage = (firstScore, secondScore, thirdScore) => {
  return (firstScore + secondScore + thirdScore) / 3;
}

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolphins, scoreKoalas);

let checkWinner = function (avgDolphins, avgKoalas) {
if (avgDolphins >= 2 * avgKoalas) {
   return console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas}).`)
} else if (avgKoalas >= 2 * avgDolphins){
   return console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins}).`)
} else {
   return console.log(`No team wins...`)
}
};

checkWinner(scoreDolphins, scoreKoalas);

scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins);
console.log(scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);