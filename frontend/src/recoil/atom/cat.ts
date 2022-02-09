import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { Cat } from '@src/typings/Cat';
import { getCats } from '@src/api/Cat';
export const catAtom = atom<Cat[]>({
  key: 'atom/cat',
  default: selector({
    key: 'cat/Default',
    get: () =>
      getCats().catch(() => {
        return [];
      }),
  }),
});

export const catItemState = atomFamily({
  key: 'catItemState',
  default: selectorFamily({
    key: 'catItemState/Default',
    get:
      (name: string) =>
      ({ get }) => {
        const cat = get(catAtom);
        return cat.find((v) => v.name === name);
      },
  }),
});

export const catNameAtom = atom({
  key: 'atom/catName',
  default: selector({
    key: 'catName/default',
    get: ({ get }) => {
      const catName = get(catAtom)[0].name;
      return catName;
    },
  }),
});
