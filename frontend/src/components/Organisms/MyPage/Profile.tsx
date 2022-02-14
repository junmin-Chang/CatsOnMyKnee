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
import CODivider from '@src/components/Atoms/CODivider';
const Profile = () => {
  const user = useRecoilValue(userAtom);
  const refresh = useRecoilRefresher_UNSTABLE(userAtom);
  const cat = useRecoilValue(catAtom);
  const [info, setInfo] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });
  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);

  const onToggleName = useCallback(() => {
    setEditName((prev) => !prev);
  }, []);
  const onToggleBio = useCallback(() => {
    setEditBio((prev) => !prev);
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInfo({
        ...info,
        [e.target.name]: e.target.value,
      });
    },
    [info],
  );

  const onSubmit = useCallback(async () => {
    await updateUserInfo({
      name: info.name,
      bio: info.bio,
    });

    if (editName && user?.name !== info.name) {
      onToggleName();
    }
    if (editBio && user?.bio !== info.bio) {
      onToggleBio();
    }

    refresh();
  }, [refresh, info, user, onToggleName, onToggleBio, editName, editBio]);

  return (
    <ProfileCard>
      <TextContent>
        {!editName ? (
          <>
            <COText fontSize={20} fontColor="#18171c">
              <mark>{user?.name}</mark>
            </COText>
            <AiFillEdit onClick={onToggleName} size={20} style={{ cursor: 'pointer', marginLeft: '5px' }} />
          </>
        ) : (
          <>
            <input type="text" defaultValue={info.name} onChange={onChange} name="name" />
            <button onClick={onSubmit}>변경</button>
            <button onClick={onToggleName}>취소</button>
          </>
        )}
      </TextContent>

      <TextContent>
        {!editBio ? (
          <>
            <COText fontSize={14} fontColor="#18171c">
              {user?.bio}
            </COText>
            <AiFillEdit onClick={onToggleBio} size={20} style={{ cursor: 'pointer', marginLeft: '5px' }} />
          </>
        ) : (
          <>
            <input type="text" defaultValue={info.bio} onChange={onChange} name="bio" />
            <button onClick={onSubmit}>변경</button>
            <button onClick={onToggleBio}>취소</button>
          </>
        )}
      </TextContent>

      <TextContent>
        <CODivider />
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
