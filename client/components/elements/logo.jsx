import React from 'react';
import logo from './logo.png';
const opacity_default = 0.680083786;
const color_default = "#52CBFF";

export default ({ color = color_default, opacity = opacity_default }) => {
    return (
        <img height="60px" src={logo} />
    );
}
