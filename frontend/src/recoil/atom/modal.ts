import { atom } from 'recoil';

export const modalAtom = atom({
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
