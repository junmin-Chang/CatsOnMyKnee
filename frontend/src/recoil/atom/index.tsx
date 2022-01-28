import { getUserInfo } from '@src/api/User';
import { User } from '@src/typings/User';
import { atom, selector } from 'recoil';

const userAtom = atom<User | null>({
  key: 'atom/user',
  default: selector({
    key: 'user/Default',
    get: () =>
      getUserInfo().catch((err) => {
        Promise.reject(err);
      }),
  }),
});

const modalAtom = atom({
  key: 'atom/modal',
  default: {
    id: 'none',
    visible: false,
    size: {
      width: 440,
      height: 600,
    },
  },
});

export { userAtom, modalAtom };
