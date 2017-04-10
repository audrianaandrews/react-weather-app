var React = require('react');

var About = (props) => {
  return(
    <div className="medium-6 large-4 columns small-centered">
      <h1 className="text-center">About</h1>
      <p>This app allows you to find out the weather is like anywhere you want. You can view the weather for just today or for the next seven days.</p>
      <br/><p className="text-center"><a href="https://github.com/audrianaandrews/react-weather-app" className="active" target="_blank">Link to Github</a></p>
    </div>
  )
};

module.exports = About;
