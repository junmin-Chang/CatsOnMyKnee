import { getUserInfo } from '@src/api/api';
import { userAtom } from '@src/recoil/atom';
import { User } from '@src/typings/User';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const useAuthentication = () => {
  const [user, setUser] = useRecoilState<User | null>(userAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const reset = useResetRecoilState(userAtom);
  useEffect(() => {
    const unsubscribe = async () => {
      const { user } = await getUserInfo().catch(() => {
        setLoading(false);
      });
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        reset();
      }
    };
    unsubscribe();
  }, [reset, setUser]);

  return { user, loading };
};

export default useAuthentication;
