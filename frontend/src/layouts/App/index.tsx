import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@src/pages/Home';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import Header from '@src/components/Organisms/Header';
import Modal from '@src/components/Organisms/Modal/Modal';
import Profile from '@src/pages/Profile';
import CatInfo from '@src/components/Organisms/CatInfo';
import DiaryReadModal from '@src/components/Organisms/Modal/DiaryReadModal';
import DiaryWriteModal from '@src/components/Organisms/Modal/DiaryWriteModal';
const App = () => {
  return (
    <React.Suspense fallback={<div>Loading..</div>}>
      <BrowserRouter>
        <GlobalStyle />
        <Container>
          <Modal />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cat" element={<Profile />}>
              <Route path=":name" element={<CatInfo />}>
                <Route path="diary" element={<DiaryWriteModal />} />
                <Route path="diary/:id" element={<DiaryReadModal />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </React.Suspense>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
export default App;
