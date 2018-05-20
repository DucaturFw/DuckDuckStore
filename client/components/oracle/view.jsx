import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import Editor from '../elements/Editor';
import Btn from '../elements/btn';

import wallet from '../../models/wallet';

export default class Oracule extends Component {
  state = {
    title: '',
    description: '',
    email: '',
    contract: '',
    showContrcat: false,
    isLoaded: false,
  };

  componentDidMount() {
    const { id } = this.props;

    axios.get(`/api/oracle/${id}`).then(res => {
      this.setState(state => ({
        ...state,
        isLoaded: true,
        ...res.data,
      }));
    });
  }

  onBuy = () => {
    this.setState(state => ({
      ...state,
      showContrcat: true
    }));
  };


  render() {
    const { id } = this.props;

    if (!this.state.isLoaded) {
      return (
        <Content>
          <Title>
            <Icon
              name={'spinner'}
              size={'4x'}
              spin
            />
          </Title>
        </Content>
      )
    }

    return (
      <Content>
        <Title>ПАТЕНТ №{id}</Title>
        <Title>{this.state.title}</Title>
        <Actions>
          <Link to={`/patent/${id}/buy`} style={{ textDecoration: 'none' }}><Btn title={'ОТПРАВИТЬ ЗАЯВКУ В РОСПАТЕНТ'} style={{width: '400px'}}/></Link>
        </Actions>
        <Description dangerouslySetInnerHTML={{__html: this.state.description}}></Description>
        <ReactMarkdown />
        <Actions>
          <Btn title={'ОТПРАВИТЬ ЗАЯВКУ В РОСПАТЕНТ'} onClick={this.onBuy} style={{width: '400px'}}/>
        </Actions>
        
      </Content>
    );
  }
}


const Icon = styled(FontAwesome) `
  color: ${props => props.theme.color.background.main};
`;

const Content = styled.div`
  padding-top: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 88rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

const Header = styled.div`
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

const Actions = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Popover = styled.div`
  position: ${props => props.show ? 'fixed' : 'absolute'};
  z-index: ${props => props.show ? 10 : -10};
  top: 80px;
  bottom: 0;
  left: ${props => props.show ? 0 : '100%'};
  right: 0;
  background: white;
  display: block;
`;

const IDE = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Description = styled.div`
  margin-top: 40px;
  text-indent: 5mm;
`;