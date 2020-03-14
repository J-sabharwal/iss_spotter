const { nextISSTimesForMyLocation } = require('./iss');

// Call back function
// 2 params - error and ip
// if error occurs call callback(error, null)
// if no error call callback(null, ip)

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`It didn't work!`, error);
  } else {
    for (const rise of passTimes) {
      const time = new Date(rise.risetime * 1000);
      const timeZone = time.toLocaleString('en-CA', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        hour12: false,
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Vancouver',
        timeZoneName: 'short'
      });
      console.log(`Next pass at ${timeZone} for ${rise.duration} seconds!`);
    }
  }
});


// *********** Nested Code Example **********
//
// fetchMyIP((error, ip) => {
  
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, coords) => {
//   if (error) {
//     console.log(`It didn't work!`, error);
//     return;
//   } else {
//     console.log(`It worked!`, coords);
//   }
// });

// fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (error, flyOver) => {

//   if (error) {
//     console.log(`It didn't work!`, error);
//     return;
//   } else {
//   //Looping through flyOver array to get the risetime value and converting it to date format and then using toLocaleString to convert it to vancouver time
//     for (const rise of flyOver) {
//       const time = new Date(rise.risetime * 1000);
//       const timeZone = time.toLocaleString('en-GB', {timeZone: 'America/Vancouver', timeZoneName: 'short'})

//       console.log(`It worked! Returned flyover times: ${timeZone} for ${rise.duration} seconds!`);
//     }
//   }
// });

