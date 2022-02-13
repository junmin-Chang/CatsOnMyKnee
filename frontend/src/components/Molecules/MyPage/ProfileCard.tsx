import COImage from '@src/components/Atoms/COImage';
import COText from '@src/components/Atoms/COText';
import CardContainer from '@src/components/Atoms/MyPage/CardContainer';
import { userAtom } from '@src/recoil/atom/user';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import InfoContainer from '@src/components/Atoms/MyPage/InfoContainer';
import { uploadUserImage } from '@src/api/User';
import { Button } from '@src/components/Atoms/COButton';

const ProfileCard: React.FC = ({ children }) => {
  const user = useRecoilValue(userAtom);
  const [image, setImage] = useState<any>({
    file: '',
    previewUrl: '',
  });
  const hiddenFileRef = useRef<HTMLInputElement>(null);

  const onClickImage = useCallback(() => {
    if (hiddenFileRef.current) {
      hiddenFileRef.current.click();
    }
  }, [hiddenFileRef]);

  const onChangeFile = (e: ChangeEvent<any>) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage({
        file,
        previewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', image.file);
    await uploadUserImage(formData);
  }, [image]);
  return (
    <CardContainer>
      <COImage src={image.previewUrl || user?.profileImage?.url} onClick={onClickImage} width="200" height="200" />
      <input type="file" style={{ display: 'none' }} ref={hiddenFileRef} onChange={onChangeFile} />
      {image.file.length !== 0 && <Button onClick={onSubmit}>변경하기</Button>}
      <InfoContainer>{children}</InfoContainer>
    </CardContainer>
  );
};

export default ProfileCard;
