import { useEffect } from 'react';

export const useDisableBodyScroll = (open: boolean) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => (document.body.style.overflow = 'unset') as any;
  }, [open]);
};
