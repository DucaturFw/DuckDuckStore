import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../elements/logo';
import Wrapper from '../elements/Wrapper';

export default class Footer extends Component {
  render() {
    return (
      <Cont>
        <Wrapper>
          <Left>
              <StyleLink to={'/'}>
                <Logo />
                <Title>Duckstore</Title>
              </StyleLink>
           </Left>
            <Linker>Условия использования</Linker>
            <Linker>Информация о сайте</Linker>
        </Wrapper>
      </Cont>
    );
  }
}

const Cont = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 220px;
  font-size: 1.4rem;
  background-color: ${props => props.theme.color.background.main};
  margin-top: 50px;
`;


const Title = styled.h4`
  font-weight: 400;
`;
const Left = styled.div`
float:left;
`;
const Linker = styled.a`
  cursor: pointer;
  margin: 0 2.4rem;
`;


const StyleLink = styled(Link) `
  text-decoration: none;
  color: inherit;
`;
