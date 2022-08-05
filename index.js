// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation } = require('./iss');

const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   fetchCoordsByIP('172.218.3.93', (error, ltdlng) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
    
//     console.log('It worked! Returned:', ltdlng);
    
    
//     fetchISSFlyoverTimes(ltdlng, (error, array) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
      
//       console.log('It worked! Returned array:', array);
//     });
    
//   });
// console.log('It worked! Returned IP:' , ip);
// });

const passDates = function (passTimes) {
  passTimes.forEach((singlePass) => {
    let dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(singlePass.risetime);
    let duration = singlePass.duration;
    console.log(`The next pass will be at ${dateAndTime} for ${duration} seconds. Wave hello to the astronauts!`)
  }
)};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
  return console.log("Error! It didn't work:", error);
  }
  passDates(passTimes);
})
  
module.exports = passDates;