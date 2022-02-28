import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import emptyDiary from '@src/assets/diary-empty.json';
import styled from 'styled-components';
const EmptyDiary = () => {
  const empty = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: empty.current as any,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: emptyDiary,
    });
    return () => lottie.stop();
  }, []);
  return (
    <Container>
      <div ref={empty} style={{ width: '200px', height: '200px' }}></div>
      <p>다이어리가 없어요.. 첫 일기장을 작성해보세요!</p>
    </Container>
  );
};

export default EmptyDiary;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  margin: 0 auto;
`;
