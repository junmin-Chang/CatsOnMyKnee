import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Notebook from '@src/assets/notebook.svg';
import { useParams } from 'react-router';
import DiaryPreview from './DiaryPreview';
import { Diary } from '@src/typings/Diary';
import COText from '../Atoms/COText';

interface Props {
  diary: Diary;
}
const DiaryContent = ({ diary }: Props) => {
  const { name } = useParams();

  const [hovered, setHovered] = useState(false);
  const onHover = useCallback(() => {
    setHovered((prev) => !prev);
  }, []);
  return (
    <Link to={`/cat/${name}/diary/${diary.id}`} style={{ marginRight: '15px', textDecoration: 'none' }}>
      <NoteBookIcon onMouseEnter={onHover} onMouseLeave={onHover} />
      {hovered && <DiaryPreview id={diary.id!} />}
      <div>
        <COText fontColor="#18171c" fontSize={15}>
          {diary.date}
        </COText>
      </div>
    </Link>
  );
};
export default DiaryContent;
const NoteBookIcon = styled(Notebook)`
  width: 80px;
  height: 80px;
  cursor: pointer;
  &:hover {
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  }
`;
