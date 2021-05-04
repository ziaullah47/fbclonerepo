import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <Container fluid={true} className="px-0">
        {this.props.children}
      </Container>
    );
  }
}
