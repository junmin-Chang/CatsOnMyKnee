import COCard from '@src/components/Atoms/COCard';
import { homeContent } from '@src/data/HomeContent';
import React from 'react';
import styled from 'styled-components';

const HomeContent = () => {
  return (
    <Container>
      {homeContent.map((c, i) => (
        <COCard width="150px" height="150px" key={i}>
          {c.children}
          {c.content}
        </COCard>
      ))}
    </Container>
  );
};

export default HomeContent;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 500px;
  background-color: inherit;
  align-items: center;
  justify-content: space-evenly;
  padding: 5% 0;
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;
