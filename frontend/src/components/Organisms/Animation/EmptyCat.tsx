import React, { useEffect, useRef } from 'react';
import emptyCat from '@src/assets/cat-empty.json';
import lottie from 'lottie-web';
import styled from 'styled-components';
const EmptyCat = () => {
  const empty = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: empty.current as any,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: emptyCat,
    });
    return () => lottie.stop();
  }, []);
  return (
    <Container>
      <div ref={empty} style={{ width: '200px', height: '200px' }}></div>
      <p>등록된 고양이가 없어요.. 등록해보세요!</p>
    </Container>
  );
};

export default EmptyCat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
