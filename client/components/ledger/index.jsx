import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import Plate from 'arui-feather/plate';
import InputAutocomplete from 'arui-feather/input-autocomplete';
import Calendar from 'arui-feather/calendar';
import wallet from '../../models/wallet';

export default class Marketplace extends Component {

  state = {
    oracles: [{id:'1',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'2',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'3',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'4',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'5',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'6',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'7',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'8',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'9',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'10',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'11',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},
    {id:'12',address:'0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce',date:'28.07.2017'},],
    date:'',
    address:'',
    idduck:''

  }
 
  
   

  
  
 

  changeaddress =(value)=>{
    this.setState({
     address:value
    })

  }
  changeidduck =(value)=>{
    this.setState({
     idduck:value
    })
  }
  changedate =(value)=>{
    this.setState({date:value});
  }
  get items() {
    return this.state.oracles.filter((item)=>{
      return item.address.indexOf(this.state.address)>-1
       && item.date.indexOf(this.state.date) >-1
       &&item.id.indexOf(this.state.idduck) >-1;
     
      }).map((item, idx) => {
      return (
        <Plate style={ { margin:' 60 px'} }>
        <StyleLink
          key={idx}
          to={`/duck/${item.id}`}
        >
          <Item delay={idx}>
            <DuckNumber>
              Ducks №{item.id}
            </DuckNumber>
            <SmallTitle>
              Address:
              </SmallTitle>
            <SmallTitle>
              {item.address}
            </SmallTitle>
            <SmallTitle>
              Date create:
            </SmallTitle>
            <SmallTitle>
              {item.date}
            </SmallTitle>
          </Item>
        </StyleLink>
        </Plate>
      );
    });
  }

  render() {
    return (
      <div>
        <Content>
          <Title>List ducks</Title>
          <div style={ { width: '300px',display:'block'} }>
          <InputAutocomplete size='m'
        width='available'
        placeholder='Search address'
        value={this.state.address}
        onChange={this.changeaddress}
              type='text'
        />
        </div>
        <div style={ { width: '300px',display:'block'} }>
          <InputAutocomplete size='m'
        width='available'
        placeholder='Search date'
        value={this.state.date}
        onChange={this.changedate}
              type='text'
        />
        </div>
        <div  style={ { width: '300px',display:'block'} }>
          <InputAutocomplete size='m'
        width='available'
        placeholder='Search id ducks'
  value={this.state.idduck}
  onChange={this.changeidduck}
  type='text'

         />

        </div>
        </Content>
        <List>{this.items}</List>
      </div>
    );
  }
}

const List = styled.div`
display: flex;
display: -webkit-flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: center;
align-items: auto;

`;
const Item = styled.div`
flex: auto;
background-color:white;
  opacity: 0;
  transform: translateY(2.4rem);
  animation: oracleCardIn 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
  animation-delay: ${props => (props.delay ? props.delay * 0.05 : 0)}s;
  
  
`;
const Icon = styled(FontAwesome) `
  color: ${props => props.theme.color.icons.main};
  text-decoration: none;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const DuckNumber = styled.h4`
  margin-top: 10px;
  text-align: center;
  font-size: 1.6rem;
  color: inherit;
  text-decoration: none;

`;
const SmallTitle = styled.div`
  margin-top: 10px;
  text-align: center;
`

const StyleLink = styled(Link) `
  text-decoration: none;
  color: inherit;
`;

