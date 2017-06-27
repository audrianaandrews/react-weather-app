var axios = require('axios');

const DARK_SKI_URL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4f75b7ec425893065e2cdf11d004888d/";
const GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCdzvxmQIKrNY6xzZobiL2JDet7sTtNrRk"

module.exports ={
  getTemp: function(location, numDays){
    var encodedLocation = encodeURIComponent(location);
    var encodedDays = encodeURIComponent(numDays);
    //var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}&cnt=${encodedDays}`;
    var gmRequestUrl = `${GOOGLE_MAPS_URL}&address=${encodedLocation}`;
    var weatherData;

     return axios.get(gmRequestUrl).then(function(res) {
        var location = res.data.results[0].geometry.location;
        var lat = encodeURIComponent(location.lat);
        var lng = encodeURIComponent(location.lng);

        var dsRequestUrl = `${DARK_SKI_URL}${lat},${lng}?units=si`;
        return axios.get(dsRequestUrl);
        /*.then(function(weatherres){
            return weatherres;
        }, function(err){
          throw new Error('Unable to fetch weather.');
        });*/
    }).then(function(res){
      return res.data;
    }).catch(function(err){
      throw new Error('Unable to fetch weather.');
    });

    /*return axios.get(requestUrl).then(function(res){
      if(res.data.cod && res.data.message && !res.data.list){
        throw new Error(res.data.message);
      }else{
        return res.data.list;
      }
    }, function(err){
      throw new Error('Unable to fetch weather.');
    });*/
  }
}
