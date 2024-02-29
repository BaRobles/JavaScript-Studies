'use strict';

// DEFAULT PARAMETERS

const bookings = [];

const createBooking = function(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers){
  // old way of setting default values:
  // numPassengers = numPassengers || 1;

  const booking = {
    flightNum,
    numPassengers,
    price,
  }
  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 3);
// skipping a default parameter:
console.log('-----');
createBooking('LH123', undefined, 1000); // it will set the default value for numPassengers


