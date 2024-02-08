'use strict';

const calcTempAmplitudeNew = function (t1, t2){
  const temps = t1.concat(t2);
  // console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++){
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }

  console.log(max, min);
  return max - min;
}

const amplitudeNew =  calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

printForecast([12, 5, -5, 0, 4]);

const printForecast = function (arr){
  let str = '';
  for (let i = 0; i < arr.length; i++ ){
      str += `${arr[i]}ºC in ${i + 1} days ... `;
    }
    console.log('...' + str);
}


