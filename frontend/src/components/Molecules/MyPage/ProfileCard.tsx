import COImage from '@src/components/Atoms/COImage';
import CardContainer from '@src/components/Atoms/MyPage/CardContainer';
import { userAtom } from '@src/recoil/atom/user';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import InfoContainer from '@src/components/Atoms/MyPage/InfoContainer';
import { uploadUserImage } from '@src/api/User';
import { Button } from '@src/components/Atoms/COButton';
import CardTop from '@src/components/Atoms/MyPage/CardTop';
const ProfileCard: React.FC = ({ children }) => {
  const user = useRecoilValue(userAtom);
  const refresh = useRecoilRefresher_UNSTABLE(userAtom);
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
    setImage({
      file: '',
      previewUrl: '',
    });
    refresh();
  }, [image, refresh]);

  const onCancel = useCallback(() => {
    setImage({
      file: '',
      previewUrl: '',
    });
  }, []);
  return (
    <CardContainer>
      <CardTop>
        <COImage src={image.previewUrl || user?.profileImage?.url} onClick={onClickImage} width="150" height="150" />
        <input type="file" style={{ display: 'none' }} ref={hiddenFileRef} onChange={onChangeFile} />
      </CardTop>
      <InfoContainer>
        {image.file.length !== 0 && (
          <>
            <Button onClick={onSubmit} style={{ width: '50%' }}>
              변경
            </Button>
            <Button onClick={onCancel} style={{ width: '50%' }}>
              취소
            </Button>
          </>
        )}
        {children}
      </InfoContainer>
    </CardContainer>
  );
};

export default ProfileCard;
