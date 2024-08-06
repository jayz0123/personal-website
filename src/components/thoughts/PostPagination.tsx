'use client';

import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Pagination, PaginationProps } from '@nextui-org/pagination';

import { useSetQueryString } from '@/utils/hooks';

export default function PostPagination({
  children,
  page = 1,
  total,
}: {
  children: React.ReactNode;
  page?: number;
  total: number;
}) {
  const [currentPage, setCurrentPage] = useState(page);
  const router = useRouter();
  const pathname = usePathname();
  const setQueryString = useSetQueryString();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const queryString = setQueryString({
      name: 'page',
      slug: page,
    });

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
}
