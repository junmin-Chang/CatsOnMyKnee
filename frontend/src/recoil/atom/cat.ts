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
      (name: string | undefined) =>
      ({ get }) => {
        const cat = get(catAtom);
        const target = cat.find((v) => v.name === name);
        return {
          ...target,
          favorite: target?.favorite?.map((v) => ({ value: v, label: v })),
          hate: target?.hate?.map((v) => ({ value: v, label: v })),
        };
      },
  }),
});

export const catNameAtom = atom({
  key: 'atom/catName',
  default: selector({
    key: 'catName/default',
    get: ({ get }) => {
      const cat = get(catAtom);
      if (cat.length > 0) {
        return cat[0].name;
      } else {
        return undefined;
      }
    },
  }),
});
