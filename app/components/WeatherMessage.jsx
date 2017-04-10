var React = require('react');

var WeatherMessage =  React.createClass({
  handleClick: function(numDays){
    this.props.onChangeDays(this.props.location,numDays);
  },
  render: function (){
    var location = this.props.location;
    var data = this.props.data;
    var numDays = this.props.numDays;

    return(
      <div  className="small-12 columns small-centered">
        <h2 className="text-center location">Weather in <b>{location}</b></h2>
        <div className="button-group">
          <button className={"button "  + (numDays == 1 ? 'active' : '')} onClick={() => this.handleClick(1)}>1 Day</button>
          <button className={"button "  + (numDays == 7 ? 'active' : '')} onClick={() => this.handleClick(7)}>7 Day</button>
        </div>
        <div className={"allWeather "  + (numDays == 7 ? 'allSeven' : 'justOne')} data-equalizer="">
          {data}
        </div>
      </div>
    );
  }
});

module.exports = WeatherMessage;
