import { User } from '@src/typings/User';
import { atom } from 'recoil';

const userAtom = atom<User | null>({
  key: 'atom/user',
  default: null,
});

const modalAtom = atom({
  key: 'atom/modal',
  default: {
    id: 'none',
    visible: false,
  },
});

export { userAtom, modalAtom };
