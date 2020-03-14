const { nextISSTimesForMyLocation } = require('./iss_promised');

// response passed from below function as passTime parameter -> looped through and coverted to new date format and added timezone and options -> printed
const printPassTimes = function(passTimes) {

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
};

// Provided passTime as param -> then executed function above, if any errors then .catch will execute a print
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  });
// .catch((error) => {
//   console.log(`It didn't work: `, error)
// });

// in the event no error catch was implemented, any error-handling would return Unhandled Promise Rejection Warning to state we have not implemented anything in the event of an error occuring.