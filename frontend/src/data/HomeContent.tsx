import React from 'react';
import NoteBook from '@src/assets/notebook.svg';
import { AiOutlinePlus, AiFillPicture } from 'react-icons/ai';
import { MdOutlineUpdate } from 'react-icons/md';
export const homeContent = [
  {
    children: <AiOutlinePlus size={50} />,
    content: '고양이 등록',
  },
  {
    children: <AiFillPicture size={50} />,
    content: '사진 등록',
  },
  {
    children: <NoteBook width={50} height={50} />,
    content: '일기장 작성하기',
  },
  {
    children: <MdOutlineUpdate size={50} />,
    content: '아이와 함께한 시간을 확인하세요',
  },
];
