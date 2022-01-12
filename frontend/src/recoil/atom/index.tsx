import { Cat } from '@src/typings/Cat';
import { User } from '@src/typings/User';
import { atom } from 'recoil';

const userAtom = atom<User | null>({
  key: 'atom/user',
  default: null,
});

const catAtom = atom<Cat | null>({
  key: 'atom/cat',
  default: null,
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

export { userAtom, catAtom, modalAtom };
