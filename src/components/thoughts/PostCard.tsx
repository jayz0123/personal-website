import Link from 'next/link';

import clsx from 'clsx';

import { ThoughtsPost } from '@/lib/definitions';

import { PostCategories, PostCoverImage, PostTitle } from './';

export function PostCard({ post }: { post: ThoughtsPost }) {
  return (
    <div
      className={clsx(
        'prose lg:prose-lg dark:prose-invert',
        'prose-h1:text-foreground',
        'prose-a:no-underline',
      )}
    >
      <Link href={`/thoughts/${post.slug}`}>
        <PostCoverImage
          src={post.coverImageURL}
          alt={post.title}
          blurDataURL={post.coverImageBlurDataURL}
        />
      </Link>

      <div className="flex flex-col space-y-4 mb-4">
        <Link href={`/thoughts/${post.slug}`}>
          <PostTitle title={post.title} />
        </Link>

        <p className="line-clamp-4">{post.abstract}</p>

        <PostCategories categories={post.categories} />
      </div>
    </div>
  );
}
