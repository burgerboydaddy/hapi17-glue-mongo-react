'use strict';
const React = require('react');


class View extends React.Component {
  render () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <h1>Hapi 17 &amp; Glue &amp; React.</h1>
          <p>Welcome to the Hapi 17, with Glue, Manifest, and MongoDb native 3.0.x template for API server.</p>
        </body>
      </html>
    );
  }
}


module.exports = View;