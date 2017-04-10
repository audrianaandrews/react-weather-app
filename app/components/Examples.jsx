var React = require('react');
var {Link} = require('react-router');

var Examples = (props) => {
  return(
    <div className="medium-6 large-4 columns small-centered">
    <h1 className="text-center">Examples</h1>
    <p>Here are a few example locations to try out!</p>
    <ol>
      <li>
        <Link to='/?location=Toronto'>Toronto, ON</Link>
      </li>
      <li>
        <Link to='/?location=Sydney,Australia'>Sydney, Australia</Link>
      </li>
      <li>
        <Link to='/?location=Barbados'>Barbados</Link>
      </li>
    </ol>
    </div>
  )
};

module.exports = Examples;
