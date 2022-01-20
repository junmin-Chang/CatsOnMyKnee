import { Cat } from '@src/typings/Cat';
import React from 'react';
import styled from 'styled-components';

interface Props {
  cat: Cat;
}
const COImage = ({ cat }: Props) => {
  return (
    <>
      {cat.image?.url ? (
        <Image src={cat.image.url} />
      ) : (
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8GHCfbjdiwwvyr-UGxobMjOD8XwUqdYCwA&usqp=CAU" />
      )}
    </>
  );
};

export default COImage;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
`;
