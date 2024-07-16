'use client';

import { useRouter } from 'next/navigation';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';

export function PhotoCardContainer({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs: string[];
}) {
  const router = useRouter();

  return (
    <div id={breadcrumbs[0]} className="flex flex-col items-center min-w-full">
      <Breadcrumbs
        size="lg"
        underline="hover"
        className="font-bold uppercase mb-4"
        itemClasses={{
          item: 'text-xl',
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem
            key={index}
            onPress={() => {
              if (index < breadcrumbs.length - 1) router.back();
            }}
          >
            {breadcrumb}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      {/* <div className="divider divider-vertical mt-0" /> */}
      <div className="min-w-full gap-2 grid grid-cols-12">{children}</div>
    </div>
  );
}
