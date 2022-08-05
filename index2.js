
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { passDates } = require('./index');

// nextISSTimesForMyLocation()
//   .then((passTimes) => {
//     passDates(passTimes);
//   })
//   .catch((error) => {
//     console.log("It didn't work: ", error.message);
//   });

nextISSTimesForMyLocation((error, passDates) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  passDates(passDates);
});