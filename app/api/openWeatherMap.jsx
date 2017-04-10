var axios = require('axios');

const OPEN_WEATHER_MAP_URL = "http//api.openweathermap.org/data/2.5/forecast/daily?appid=b67ae7c4022d2bba7fa12c45c86aaec8&units=metric";

module.exports ={
  getTemp: function(location, numDays){
    var encodedLocation = encodeURIComponent(location);
    var encodedDays = encodeURIComponent(numDays);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}&cnt=${encodedDays}`;

    return axios.get(requestUrl).then(function(res){
      if(res.data.cod && res.data.message && !res.data.list){
        throw new Error(res.data.message);
      }else{
        return res.data.list;
      }
    }, function(err){
      throw new Error('Unable to fetch weather.');
    });
  }
}
