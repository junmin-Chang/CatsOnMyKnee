import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '@src/pages/Home';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import Header from '@src/components/Organisms/Header';
import axios from 'axios';
import Modal from '@src/components/Organisms/Modal';
import Profile from '@src/pages/Profile';
const App = () => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:8000/users', {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.name);
      })
      .catch((err) => {
        if (err) {
          axios.get('http://localhost:8000/users/refresh', { withCredentials: true });
        }
      });
  }, []);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Container>
        <Modal />
        <Header />
        <Switch>
          <Route exact path="/">
            <Home username={username} />
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
