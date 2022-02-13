import COText from '@src/components/Atoms/COText';
import { Card } from '@src/components/Molecules/Card';
import ProfileCard from '@src/components/Molecules/MyPage/ProfileCard';
import { catAtom } from '@src/recoil/atom/cat';
import { userAtom } from '@src/recoil/atom/user';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';
import { updateUserInfo } from '@src/api/User';
const Profile = () => {
  const user = useRecoilValue(userAtom);
  const refresh = useRecoilRefresher_UNSTABLE(userAtom);
  const cat = useRecoilValue(catAtom);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const onToggle = useCallback(() => {
    setEdit((prev) => !prev);
  }, []);
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const onSubmitNickname = useCallback(async () => {
    await updateUserInfo({
      name,
    });
    onToggle();
    refresh();
  }, [name, onToggle, refresh]);
  return (
    <ProfileCard>
      <TextContent>
        {!edit ? (
          <>
            <COText fontSize={20} fontColor="#18171c">
              <mark>{user?.name}</mark> 집사님
            </COText>
            <AiFillEdit onClick={onToggle} size={20} style={{ cursor: 'pointer' }} />
          </>
        ) : (
          <>
            <input defaultValue={name} onChange={onChangeName} />
            <button onClick={onSubmitNickname}>변경</button>
            <button onClick={onToggle}>취소</button>
          </>
        )}
      </TextContent>

      <TextContent>
        <COText fontSize={20} fontColor="#18171c">
          함께하는 냥이
        </COText>
      </TextContent>
      {cat.map((cat) => (
        <Card cat={cat} />
      ))}
    </ProfileCard>
  );
};

export default Profile;

const TextContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;
