import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import'./header.css';
import Logo from '../elements/logo';
import Wrapper from '../elements/Wrapper';

export default class Header extends Component {
  render() {
    return (
      <Cont>
        <Wrapper>
          <Inner>
            <Left>
              <StyleLink to={'/'}>
                <Logo />
              </StyleLink>
            </Left>
            <Right>
              <StyleLink
                to={'/patent/new'}
              >
                <AddOracle>
                  <HoverIcon name="plus-circle" size="2x" />
                  <Signing>Register user</Signing>
                </AddOracle>
              </StyleLink>
            </Right>
          </Inner>
        </Wrapper>
      </Cont>
    );
  }
}

const Cont = styled.div`
  flex-shrink: 0;
  height: 80px;
  font-size: 1.4rem;
  background-color: ${props => props.theme.color.background.main};
`;

const Inner = styled.div`
  display: flex;
  padding-top: 13px;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin-left: 15px;
  margin-top: 10px;
  font-weight: 400;
  font-family: 'ClearSans Bold',Helvetica,sans-serif;
  font-size: 30px;
  line-height: 29px;
  text-align:center;

`;

const Left = styled.div`
  padding-left: 30px;
  display: flex;
`;
const Right = styled.div`
  padding-right: 30px;
  margin-top: 13px;
`;


const Signing = styled.span`
  vertical-align: super;
  margin-left: 10px;
`;

const StyleLink = styled(Link) `
  display: flex;
  text-decoration: none;
  color: inherit;
`;


const Icon = styled(FontAwesome) `
  color: ${props => props.theme.color.icons.main};
  text-decoration: none;
`;
const AddOracle = styled.div`
  cursor: pointer;
`;

const HoverIcon = styled(Icon) `
  &:hover {
    color: ${props => props.theme.color.icons.dark};
  }
`
