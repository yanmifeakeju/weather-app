const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8b8680b41c6bb6072d2b502098c20b6c/${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else {
      if (body.error) {
        callback(body.error, undefined);
      }
      const humidity = body.daily.data[0].humidity;
      const temperatureHigh = body.daily.data[0].temperatureMax;
      const current = body.daily.data[0].summary;
      const temperature = body.currently.temperature;
      const precipitation = body.currently.precipProbability;
     
      callback(null, {
        current,
        temperature,
        precipitation,
        humidity,
        temperatureHigh
      });
    }
  });
};
// const url =
//   "https://api.darksky.net/forecast/8b8680b41c6bb6072d2b502098c20b6c/8.57323,4.70361";
// forecast(8.57323, 4.70361, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = forecast;
