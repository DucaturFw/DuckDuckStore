import React, { Component } from 'react';
import styled from 'styled-components';

import Wrapper from '../elements/Wrapper';

export default function Main({ children }) {
  return (
    <Cont>
      <Wrapper>{children}</Wrapper>
    </Cont>
  );
}

const Cont = styled.div`
  flex-grow: 1;
  font-size: 1.4rem;
`;
