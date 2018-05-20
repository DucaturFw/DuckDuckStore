import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

import Editor from '../elements/Editor';
import Btn from '../elements/btn';

import wallet from '../../models/wallet';

export default class Oracule extends Component {
  state = {
    id: null,

    pat_id: ""/*  string */,
    region: ""/*  string */,
    exp_date: ""/*  string */,
    resale: ""/*  string */,
    terms: ""/*  string */,

    title: '',
    description: '',
    email: '',
    done: false,

    patent: {
      title: '',
      description: '',
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`/api/oracle/${id}`).then(res => {
      this.setState(state => ({
        ...state,
        id,
        isLoaded: true,
        patent: res.data,
      }));
    });
  }

  onRegionChange = e => {
    this.setState({ region: e.target.value });
  };

  onDateChange = e => {
    this.setState({ exp_date: e.target.value });
  };

  onEditChange = terms => {
    this.setState({ terms });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    window.aplaEvo.sendTransaction({
      name: 'init_sale',
      data: {
        pat_id: `${this.state.id}`,
        region: `${this.state.region}`,
        exp_date: this.state.exp_date,
        resale: this.state.resale,
        terms: `${this.state.terms}`
      },
      text: {
        title: "Отправить заявку",
        description: `Патент №${this.state.id}: ${this.state.patent.title}`
      }
    });
  };
  
  onCheckbox = e => {
    this.setState({ resale: e.target.checked })
  };

  render() {
    if (this.state.done) {
      return (
        <Content>
          <Title>Отправлена заявка на изобретение №{this.state.id}: {this.state.patent.title}</Title>
        </Content>
      );
    }

    return (
      <Content>
        <Title>Заявка на переход прав на изобретение №{this.state.id}</Title>
        <Title>{this.state.patent.title}</Title>
        <Input onChange={this.onChange} name="region" placeholder="Регион" />
        {/* <select>
          <option>Huy</option>
        </select> */}
        <Input onChange={this.onChange} name="date" placeholder="Срок предоставления права использования" />
        <Input type="checkbox" defaultChecked={this.state.chkbox} name="resale" onChange={this.onCheckbox} />
        <Title style={{ textAlign: 'left', }}>Дополнительные условия использования:</Title>
        <Editor canEdit={false} onChange={this.onEditChange} />
        <div>
          <Btn title={'Отправить'} onClick={this.onSubmit} />
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
