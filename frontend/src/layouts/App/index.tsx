import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@src/pages/Home';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import Header from '@src/components/Organisms/Header';
import Modal from '@src/components/Organisms/Modal';
import Profile from '@src/pages/Profile';
import useAuthentication from '@src/hooks/useAuthentication';
import CatInfo from '@src/components/Organisms/CatInfo';
import DiaryModal from '@src/components/Molecules/DiaryModal';

const App = () => {
  const { loading } = useAuthentication();

  if (loading) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Container>
        <Modal />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat" element={<Profile />}>
            <Route path=":name" element={<CatInfo />}>
              <Route path="diary" element={<DiaryModal />} />
            </Route>
          </Route>
        </Routes>
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
