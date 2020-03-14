// promise-native is a library that returns a promise for each async network
const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes  = function(body) {
  let coords = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = function() {
// returned IP -> provided IP = returned coords -> provided coords = returned flyover response times/duration -> provided (JSON.parse) times and duration to index2 as passTimes.
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
  
};


module.exports = { nextISSTimesForMyLocation  };