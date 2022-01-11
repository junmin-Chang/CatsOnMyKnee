import React from 'react';
import styled from 'styled-components';

const CatInfo = () => {
  return (
    <Container>
      <h2>Cat Info</h2>
    </Container>
  );
};

export default CatInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  widows: 70%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 15px;
`;
