import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '@src/pages/Home';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import Header from '@src/components/Organisms/Header';
import Modal from '@src/components/Organisms/Modal';
import Profile from '@src/pages/Profile';
import useAuthentication from '@src/hooks/useAuthentication';

const App = () => {
  const { loading } = useAuthentication();
  if (loading) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Container>
        <Modal />
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
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
