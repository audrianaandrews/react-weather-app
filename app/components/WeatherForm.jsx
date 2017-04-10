var React = require('react');

var WeatherForm = React.createClass({
  onFormSubmit: function(e){
    e.preventDefault();

    var location = this.refs.location.value;

    if(location.length > 0){
      this.refs.location.value = "";
      this.props.onSearch(location,1);
    }
  },
  render: function (){
    return(
      <div className="row">
        <div className="medium-6 large-4 columns small-centered">
          <form onSubmit={this.onFormSubmit}>
            <div className="input-group">
              <input className="input-group-field" type="search" ref="location" placeholder="Search weather by city"/>
              <div className="input-group-button">
                <button className="button">Go</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = WeatherForm;
