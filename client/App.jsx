import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import './styles/styles.css';

import Main from './components/elements/Main';
import Header from './components/header';
import Ledger from './components/ledger';
import Footer from './components/footer';
import wallet from '../client/models/wallet';
import Create from './components/oracle/create';
export default class App extends Component {
  state ={
    userAccount:'',
    allDucks:'',

  }
  componentDidMount() {
    wallet.init().then(data => {
      console.log(data);
this.setState({allDucks:data.ducks});
this.setState({userAccount:wallet.getUserAccount()});
    });
  }

  render() {
    const {userAccount} =this.props;
    return (

      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <Header />
            <Main>

            <Route exact path={'/'} component={Ledger}  />
              <Switch>
                <Route path={'/duck/buy'} component={Create} />

              </Switch>
            </Main>
          </Container>
        </Router>
      </ThemeProvider>

    );
  }
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
