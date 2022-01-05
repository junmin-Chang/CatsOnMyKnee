import { modalAtom } from '@src/recoil/atom';
import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import LoginModal from './LoginModal';
const Modal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const closeModal = useCallback(() => {
    setModal({ ...modal, visible: false });
  }, [modal, setModal]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <>
      {modal.visible && (
        <CreateModal onClick={closeModal}>
          <div onClick={stopPropagation}>
            {modal.id === 'login' && modal.visible && <LoginModal onClose={closeModal} />}
          </div>
        </CreateModal>
      )}
    </>
  );
};

export default Modal;

const CreateModal = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  & > div {
    display: flex;
    flex-direction: column;
    opacity: 1 !important;
    margin: 0 auto;
    width: 600px;
    height: 440px;
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    border-radius: 5px;
    user-select: none;
    z-index: 1012;
  }
`;
