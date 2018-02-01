'use strict';
const React = require('react');

class AboutView extends React.Component {
  render () {
    return (
      <div>
        <h1>About this template.</h1>
        <p>Purpose of this template is to show how to integrate Hapi 17, with glue, manifest, mongo native (3.x) and react into one single app.</p>
        <p>Usual examples show only basic, fast start usage, that (usually) is very useless in case of real world apps that we need to build.</p>
        <p>This one shows how to do that (up to point that can be done, but not to show every bit of nice code).</p>
      </div>
    );
  }
}

module.exports = AboutView;
