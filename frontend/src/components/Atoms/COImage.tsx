import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
  src: any;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}
const COImage = ({ src, onClick, width = '50', height = '50', style }: Props) => {
  return (
    <>
      <Image
        width={width}
        height={height}
        src={
          src ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mFdHIh-ATxP-RN_vMoOBXAlikpRGPxJugQ&usqp=CAU'
        }
        onClick={onClick}
        style={style}
      />
    </>
  );
};

export default COImage;

const Image = styled.img<{ width: string; height: string }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 100%;
  cursor: pointer;
`;
