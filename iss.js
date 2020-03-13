const request = require('request');

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
    console.log(ip);

    if (err) {
      callback(err, null);
      return;
    }
    if (data.statusCode !== 200) {
      const msg = `Status Code ${data.statusCode} when fetching coordinates.`;
      callback(Error(msg), null);
      return;
    }
    let latLong = {
      latitude: JSON.parse(body).data.latitude,
      longitude: JSON.parse(body).data.longitude
    };
    callback(null, latLong);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };