import COText from '@src/components/Atoms/COText';
import { Card } from '@src/components/Molecules/Card';
import ProfileCard from '@src/components/Molecules/MyPage/ProfileCard';
import { catAtom } from '@src/recoil/atom/cat';
import { userAtom } from '@src/recoil/atom/user';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Profile = () => {
  const user = useRecoilValue(userAtom);
  const cat = useRecoilValue(catAtom);
  return (
    <ProfileCard>
      <TextContent>
        <COText fontSize={20} fontColor="#18171c">
          <mark>{user?.name}</mark> 집사님
        </COText>
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
