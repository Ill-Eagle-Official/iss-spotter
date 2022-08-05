const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const userIP = JSON.parse(body).ip;
    callback(null, userIP);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    const resultObject = JSON.parse(body);

    if (!resultObject.success) {
      const message = `Success status was ${resultObject.success}. Server message says: ${resultObject.message} when fetching for IP ${resultObject.ip}`;
      callback(Error(message), null);
      return;
    } 
    
    let { latitude, longitude } = resultObject;
    callback(null, {latitude, longitude});
    return;
  });
};

const fetchISSFlyoverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
    return;
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    
    fetchCoordsByIP(ip, (error, ltdlng) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyoverTimes(ltdlng, (error, array) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, array);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation };