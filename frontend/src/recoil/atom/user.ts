import { atom, selector } from 'recoil';
import { User } from '@src/typings/User';
import { getUserInfo } from '@src/api/User';
export const userAtom = atom<User | null>({
  key: 'atom/user',
  default: selector({
    key: 'user/Default',
    get: () =>
      getUserInfo().catch((err) => {
        Promise.reject(err);
      }),
  }),
});
