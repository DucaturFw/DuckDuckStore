import React, { Component } from 'react';
import styled from 'styled-components';

import Create from './create';
import View from './view';

export default class Oracule extends Component {
  render() {
    const { id } = this.props.match.params;

    if (id === 'new') {
      return <Create />;
    } else {
      return <View id={id} />;
    }
  }
}
