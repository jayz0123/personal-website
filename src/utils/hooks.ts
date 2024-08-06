import { useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

export function useSetQueryString() {
  const searchParams = useSearchParams();

  return useCallback(
    ({ name, slug }: { name: string; slug: string | number }) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, slug.toString());

      return params.toString();
    },
    [searchParams],
  );
}