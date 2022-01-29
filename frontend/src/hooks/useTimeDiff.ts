import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const useTimeDiff = (date: Date) => {
  const diff = useMemo(() => {
    return differenceInDays(new Date(), date);
  }, [date]);

  return diff;
};

export default useTimeDiff;
