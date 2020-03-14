const request = require('request');

// this function is calling back all the fetch functions
const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
      return;
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(err, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, passTimes) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, passTimes);
      });
    });
  });
};

const fetchMyIP = function(callback) {
 
  request(
    'https://api.ipify.org?format=json', (err, data, body) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (data.statusCode !== 200) {
        const msg = `Status Code ${data.statusCode} when fetching IP. Data: ${body}`;
        callback(Error(msg), null);
        return;
      }
      callback(null, JSON.parse(body).ip);
    });
};

const fetchCoordsByIP = function(ip, callback) {
 
  request('https://ipvigilante.com/' + ip, (err, data, body) => {

    if (err) {
      callback(err, null);
      return;
    }
    if (data.statusCode !== 200) {
      const msg = `Status Code ${data.statusCode} when fetching coordinates.`;
      callback(Error(msg), null);
      return;
    }
    let coords = {
      latitude: JSON.parse(body).data.latitude,
      longitude: JSON.parse(body).data.longitude
    };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates.`;
      callback(Error(msg), null);
      return;
    }
    const flyOver = JSON.parse(body).response;
    callback(null, flyOver);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };