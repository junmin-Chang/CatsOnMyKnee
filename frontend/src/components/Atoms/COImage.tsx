import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
  src: any;
}
const COImage = ({ src, onClick }: Props) => {
  return (
    <>
      <Image
        src={
          src ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mFdHIh-ATxP-RN_vMoOBXAlikpRGPxJugQ&usqp=CAU'
        }
        onClick={onClick}
      />
    </>
  );
};

export default COImage;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
