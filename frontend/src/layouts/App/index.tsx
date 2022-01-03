import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '@src/pages/Home';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import Header from '@src/components/Organisms/Header';
import Login from '@src/pages/Login';
const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Container>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
export default App;
