const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// Call back function
// 2 params - error and ip
// if error occurs call callback(error, null)
// if no error call callback(null, ip)
// fetchMyIP((error, ip) => {
 
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

fetchCoordsByIP('162.245.144.188', (error, coords) => {
  if (error) {
    console.log(`It didn't work!`, error);
    return;
  } else {
    console.log(`It worked!`, coords);
  }
});