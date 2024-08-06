import Link from 'next/link';

import clsx from 'clsx';

import { ThoughtsPost } from '@/lib/definitions';

import { PostCategories, PostCoverImage, PostTitle } from './';

export function PostCard({ post }: { post: ThoughtsPost }) {
  return (
    <div
      className={clsx(
        'prose lg:prose-lg dark:prose-invert',
        'prose-h1:text-foreground prose-h1:my-4',
        'prose-a:no-underline prose-img:my-4 prose-p:my-4',
      )}
    >
      <Link href={`/thoughts/${post.slug}`}>
        <PostCoverImage
          src={post.coverImageURL}
          alt={post.title}
          blurDataURL={post.coverImageBlurDataURL}
        />
      </Link>

      <Link href={`/thoughts/${post.slug}`}>
        <PostTitle title={post.title} />
      </Link>

      <p className="line-clamp-3">{post.abstract}</p>

      <PostCategories categories={post.categories} />
    </div>
  );
}
