import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import Heading from 'arui-feather/heading';
import Btn from '../elements/btn';
import Web3 from 'web3';
import wallet from '../../models/wallet';

export default class Oracule extends Component {
  state = {
    amount:''
  };
 
  handleInput = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = () => {
    const { amount } = this.state;

    wallet.buyDucks(amount);
  }

  render() {
 

    return (
      <Content>
        <Title>Buy duck</Title>
          <Heading>Amount</Heading>
          <Input name="amount" value={this.state.amount} onChange={this.handleInput}/>
        <div>
          <Btn title={'Buy duck'} onClick={this.onSubmit} />
        </div>
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

const Input = styled.input`
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.color.icons.main};
  outline: none;
  padding: 10px;
  font-size: 1.5rem;
  width: 100%;
  border-radius: 4px;
`;
