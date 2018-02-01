'use strict';
const React = require('react');


class LayoutView extends React.Component {
  render () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <div id="content"
            dangerouslySetInnerHTML={{ __html: this.props.children }}>
          </div>
          <hr />
          <p>
            <a href="/">Home</a> | <a href="/about">About</a>
          </p>
        </body>
      </html>
    );
  }
}

module.exports = LayoutView;