import useSWR from 'swr';
import { fetchQuery } from '@/lib/database';

export const useForkedFrom = (forkedFrom?: string) => {
  const { data, error } = useSWR(
    forkedFrom ? ['forkedFrom', forkedFrom] : null,
    () => fetchQuery(forkedFrom!)
  );

  if (error) {
    console.error(error);
  }

  return data;
};
