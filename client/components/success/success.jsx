import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import Heading from 'arui-feather/heading';
import Btn from '../elements/btn';
import Web3 from 'web3';
import wallet from '../../models/wallet';

export default class Success extends Component {

 
  render() {
 
const  buy = this.props.location.pathname.substr(14);
    return (
      <Content>
           <Heading >Success!</Heading>
        
        <Title>Duck bought for { buy } ETH</Title>
         
      </Content>
    );
  }
}

const Cont = styled.div`
  flex-grow: 1;
`;

const Content = styled.div`
  padding-top: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;


