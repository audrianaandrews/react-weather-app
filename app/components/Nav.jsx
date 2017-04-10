var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  onSearch:function(e){
    e.preventDefault();

    var location = this.refs.location.value;
    var encodedLocation = encodeURIComponent(location);

    if(location.length > 0){
      this.refs.location.value = "";
      window.location.hash =  "#/?location=" + encodedLocation;
    }
  },
  render:function(){
    return(
      <div className="top-bar">
        <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">
                <IndexLink to="/">React Weather App</IndexLink>
              </li>
              <li>
                <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Get Weather</IndexLink>
              </li>
              <li>
                  <Link to="/about" activeClassName="active" activeStyle={{fontWeight:'bold'}}>About</Link>
              </li>
              <li>
                  <Link to="/examples" activeClassName="active" activeStyle={{fontWeight:'bold'}}>Examples</Link>
              </li>
            </ul>
        </div>
        <div className="top-bar-right">
            <form onSubmit={this.onSearch}>
              <ul className="menu">
                <li>
                  <div className="input-group">
                    <input className="input-group-field" type="search" ref="location" placeholder="Search weather by city"/>
                    <div className="input-group-button">
                      <button className="button">Go</button>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
        </div>
      </div>

    )
  }
});

module.exports = Nav;
