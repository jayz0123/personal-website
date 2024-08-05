import Link from 'next/link';

export function PostCategories({
  categories,
}: {
  categories: { name: string }[];
}) {
  return (
    <div className="flex space-x-4 text-sm font-mono">
      {categories.map((category, index) => (
        <Link key={index} href={`/categories/${category.name}`}>
          <span>#</span>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
