'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

import { useQueryString } from '@/utils/hooks';

export function PostCategories({
  categories,
}: {
  categories: { name: string; slug: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const getQueryString = useQueryString('get');
  const getAllQueryString = useQueryString('getAll');
  const appendQueryString = useQueryString('append');
  const deleteQueryString = useQueryString('delete');

  const categoryQueries = getAllQueryString('category');

  const addCategory = (category: string) => {
    if (categoryQueries.includes(category)) {
      return;
    }

    // const queryString = deleteQueryString('page');
    // router.push(pathname + '?' + queryString);
    const queryStringA = appendQueryString('category', category);
    router.push(pathname + '?' + queryStringA);
  };

  return (
    <div className="flex flex-wrap gap-2 text-sm font-mono">
      {categories.map((category, index) => (
        <div key={index} className="flex-grow-0 flex-shrink-0">
          <Button
            size="sm"
            variant="shadow"
            onPress={() => addCategory(category.slug)}
            className="max-w-fit min-w-min bg-gradient-to-br from-sky-500 to-cyan-500 opacity-80"
          >
            {'#' + category.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
