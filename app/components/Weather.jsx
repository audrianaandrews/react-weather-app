var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
  getInitialState: function(){
    return{
      isLoading: false,
      numDays: 1
    }
  },
  handleSearch: function(location, numDays){
    var that = this;

    this.setState({
      isLoading : true,
      errorMessage: undefined,
      location: undefined,
      numDays: undefined,
      data: undefined
    });

    openWeatherMap.getTemp(location, numDays).then(function(data){
      var weatherData = data.daily.data;

      if(numDays == 1){
        weatherData = weatherData.slice(0, 1);
      } else{
        weatherData = weatherData.slice(0, 6);
      }
      var weeklySummary = data.daily.summary;


      data = weatherData.map((day, index) => {
        var days = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobor", "November", "December"];
        var date = new Date();
        date.setDate(date.getDate()+index);
        var date = days[date.getDay()]+ ", " + months[date.getMonth()] + " " + date.getDate()+ ", "  + date.getFullYear();

        var temp = day.apparentTemperatureMax;
        var highTemp = day.temperatureMax;
        var lowTemp = day.temperatureMin;
        var weatherDesc = day.summary;
        var icon = day.icon.replace(/-/g, "_").toUpperCase();
        var iconID = icon + index;

        return (
          <div className="weatherContainer text-center" key={index} data-equalizer-watch="">
            <p className="date">{date}</p>
            <p className="weatherDesc">{weatherDesc}</p>
            <p className="temp">{temp}&#8451;</p>
            <p className="otherInfo text-center"><b>High: </b>{highTemp}&#8451;</p>
            <p className="otherInfo text-center"><b>Low: </b>{lowTemp}&#8451;</p>
          </div>
        );
      });

      that.setState({
        location:location,
        data: data,
        numDays: numDays,
        isLoading: false
      });
    }, function(e){
      that.setState({
        isLoading: false,
        errorMessage: e.message
      });
    })
  },
  //after component has been loaded into the browser
  componentDidMount: function(){

    var location = this.props.location.query.location;

    if(location && location.length > 0){
      this.handleSearch(location, 1);
      window.location.hash = "#/";
    }
  },
  componentWillReceiveProps: function(newProps){
    var location = newProps.location.query.location;

    if(location && location.length > 0){
      this.handleSearch(location, 1);
      window.location.hash = "#/";
    }
  },
  render: function (){
    var {isLoading, location, data, numDays, errorMessage} = this.state;
    var handleSearch = this.handleSearch;

    function renderMessage(){
      if(isLoading){
        return <h3 className="text-center">Fetching weather...</h3>;
      }
      else if (data && location){
          return <WeatherMessage location={location} data={data} onChangeDays={handleSearch} numDays={numDays}></WeatherMessage>;
      }
    }
    function renderError(){
      if(typeof errorMessage === 'string'){
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }

    return(
      <div className="small-12 columns small-centered">
        <h1 className="text-center">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch}/>

        {renderMessage()}
        {renderError()}
      </div>
    );
  }
});

module.exports = Weather;
