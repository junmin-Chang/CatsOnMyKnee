import { userAtom } from '@src/recoil/atom';
import { User } from '@src/typings/User';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const useAuthentication = () => {
  const [user, setUser] = useRecoilState<User | null>(userAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const reset = useResetRecoilState(userAtom);
};

export default useAuthentication;
