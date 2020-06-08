const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoieWFubWlmZWFrZWp1IiwiYSI6ImNrYWt3a293ZzBreDkyeG82cGYxdzE3YjAifQ.EbWmGC9FI4I_CEVemYtnWA`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      console.log(error);
      callback(`Unable to connect to location services`, undefined);
    } else {
      console.log("geocode: " + body);
      if (body.features.length === 0) {
        callback(`Unable to find location try another search`, undefined);
        return;
      }
      const data = body.features;
      const latitude = data[0].center[1];
      const longitude = data[0].center[0];
      const location = data[0].place_name;
      callback(null, {
        latitude,
        longitude,
        location,
      });
    }
  });
};
// geocode("Lekki Nigeria", (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = geocode;
