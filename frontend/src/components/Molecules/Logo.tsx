import React from 'react';
import styled from 'styled-components';
import COLink from '../Atoms/COLink';
const Logo = () => {
  return (
    <Container>
      <COLink color="#ffffff" size={20} weight={700} to="/">
        내 무릎 위 고양이 🐱
      </COLink>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
`;
export default Logo;
