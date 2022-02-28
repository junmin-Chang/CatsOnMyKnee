import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@src/pages/Home';
import GlobalStyle from './GlobalStyles';
import styled from 'styled-components';
import Header from '@src/components/Organisms/Header';
import Modal from '@src/components/Organisms/Modal/Modal';
import CatInfo from '@src/components/Organisms/CatInfo';
import DiaryReadModal from '@src/components/Organisms/Modal/DiaryReadModal';
import DiaryWriteModal from '@src/components/Organisms/Modal/DiaryWriteModal';
import loadingAnimation from '@src/assets/loading.json';
import lottie from 'lottie-web';
const MyPage = React.lazy(() => import('@src/pages/MyPage/index'));
const Cat = React.lazy(() => import('@src/pages/Cat/index'));
const App = () => {
  const loading = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: loading.current as any,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
    });
    return () => lottie.stop();
  }, []);
  return (
    <React.Suspense fallback={<div ref={loading}></div>}>
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
