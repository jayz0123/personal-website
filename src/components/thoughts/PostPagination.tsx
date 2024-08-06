import React from 'react';

import { Pagination, PaginationProps } from '@nextui-org/pagination';

export default function PostPagination({
  children,
}: {
  children: React.ReactNode;
}) {
  const props: PaginationProps = {
    showControls: true,
    total: 10,
    variant: 'light',
    classNames: {
      cursor: 'bg-gradient-to-br from-sky-500 to-cyan-500',
    },
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Pagination {...props} />
      {children}
      <Pagination {...props} />
    </div>
  );
}
