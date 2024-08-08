'use client';

import { memo, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Pagination, PaginationProps } from '@nextui-org/pagination';

import { useQueryString } from '@/utils/hooks';

export const PostPagination = memo(function PostPagination({
  children,
  currentPage,
  total,
}: {
  children: React.ReactNode;
  currentPage: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setQueryString = useQueryString('set');

  useEffect(() => {
    // prefetch next page
    router.prefetch(pathname + '?' + setQueryString('page', currentPage + 1));
  }, [currentPage, pathname, router, setQueryString]);

  const handlePageChange = (page: number) => {
    const queryString = setQueryString('page', page);

    router.push(pathname + '?' + queryString);
  };

  const props: PaginationProps = {
    initialPage: 1,
    showControls: true,
    total: total,
    variant: 'light',
    classNames: {
      cursor: 'bg-gradient-to-br from-sky-500 to-cyan-500',
    },
    onChange: handlePageChange,
    page: currentPage,
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Pagination {...props} />
      {children}
      <Pagination {...props} />
    </div>
  );
});
