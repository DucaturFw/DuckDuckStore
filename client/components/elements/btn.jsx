import React, { Component } from 'react';
import styled from 'styled-components';

export default function Main({ onClick, title, style }) {
  return <Action onClick={onClick} style={style}>{title}</Action>;
}

const Action = styled.div`
  width: 200px;
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
  font-size: 2rem;
  padding: 1.25rem 2.5rem;
  display: block;
  background-color: #009ac9;
  border: 1px solid transparent;
  color: #ffffff;
  font-weight: 300;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ffffff;
    color: #009ac9;
    border-color: #009ac9;
  }
`;
