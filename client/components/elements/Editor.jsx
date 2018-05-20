import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Simplemde from 'simplemde';

export default class Editor extends Component {
  componentDidMount() {
    this.initMD({
      element: ReactDOM.findDOMNode(this),
      initialValue: this.props.value,
      canEdit: this.props.canEdit
    });
  }

  componentWillUnmount() {
    this.simplemde.toTextArea();
    this.simplemde = null;
  }

  initMD({ element, initialValue }) {
    this.simplemde = new Simplemde({
      element,
      initialValue
    });

    this.simplemde.codemirror.on('change', () => {
      this.onChange(this.simplemde.value());
    });
  }

  onChange = text => {
    if (this.props.onChange) {
      this.props.onChange(text);
    }
  };

  render() {
    return <textarea />;
  }
}
