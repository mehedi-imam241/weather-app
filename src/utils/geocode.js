const  request  = require("request");

const geoCode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoibWVoZWRpLWltYW0iLCJhIjoiY2syNmdza2gyMDBraTNjcW16ZWR0ZXoyeiJ9.4FmbBuzBM1M4wr6CZUcY-w&";
    
      request({ url, json: true }, (error,{body}) => {
      if (error) {
        callback("Cannot connect to GeoCode", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another one!", undefined);
      }
      else{
          callback(undefined,{latitude:body.features[0].center[1],longitude:body.features[0].center[0],placeName:body.features[0].place_name})
      }
    });
  };

module.exports = geoCode