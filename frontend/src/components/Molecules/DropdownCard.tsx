import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import useOutsideClick from '@src/hooks/useOutsideClick';
import { deleteCat } from '@src/api/Cat/index';

interface Props {
  handleEdit: (edit: boolean) => void;
}
const DropdownCard = ({ handleEdit }: Props) => {
  const { name } = useParams();
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const onToggle = useCallback(() => {
    setActive((prev) => !prev);
  }, []);
  useOutsideClick(dropdownRef, () => setActive(false));
  return (
    <div>
      <MoreIcon onClick={onToggle} />
      {active && (
        <Container ref={dropdownRef}>
          <Ul>
            <Li>
              <Menu
                onClick={() => {
                  // api call,
                  onToggle();
                  handleEdit(true);
                }}
              >
                수정하기
              </Menu>
            </Li>
            <Li>
              <Menu
                onClick={() => {
                  // api call,
                  deleteCat(name!).then(() => {
                    navigate('/cat');
                    onToggle();
                  });
                }}
              >
                삭제하기
              </Menu>
            </Li>
            <Li>
              <Menu
                onClick={() => {
                  // api call,
                  onToggle();
                }}
              >
                공유하기
              </Menu>
            </Li>
          </Ul>
        </Container>
      )}
    </div>
  );
};

export default DropdownCard;

const Container = styled.nav`
  background-color: #ffffff;
  z-index: 100;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  right: 0;
  width: 200px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  border-bottom: 1px solid #dddddd;
`;

const Menu = styled.div`
  color: #333333;
  padding: 15px 20px;
  display: block;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  :hover {
    background-color: #f28500;
    color: '#ffffff';
  }
`;

const MoreIcon = styled(BiDotsHorizontalRounded)`
  cursor: pointer;
`;
