import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@src/pages/Home';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import Header from '@src/components/Organisms/Header';
import Modal from '@src/components/Organisms/Modal/Modal';
import CatInfo from '@src/components/Organisms/CatInfo';
import DiaryReadModal from '@src/components/Organisms/Modal/DiaryReadModal';
import DiaryWriteModal from '@src/components/Organisms/Modal/DiaryWriteModal';
import Cat from '@src/pages/Cat';
import MyPage from '@src/pages/MyPage';
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
            <Route path="/cat" element={<Cat />}>
              <Route path=":name" element={<CatInfo />}>
                <Route path="diary" element={<DiaryWriteModal />} />
                <Route path="diary/:id" element={<DiaryReadModal />} />
              </Route>
            </Route>
            <Route path="/profile" element={<MyPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
      {/* <Footer /> */}
    </React.Suspense>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export default App;
