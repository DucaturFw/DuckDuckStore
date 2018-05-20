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
    amount:'1'
  };
 
  handleInput = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = () => {
    
    if(typeof web3 == 'undefined'){
      console.log("not web3");
      window.location.replace(`exp://192.168.1.188:19000/?m=pay&callback=http%3A%2F%2F192.168.0.134%3A3000%2F&amount=${this.state.amount}&to=0xa2eb3b5a0c63012040137d6ad5dd16b5ed234e2b`);
    }
   else {    
    const { amount } = this.state;

    wallet.buyDucks(amount);
   }
   
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
