import { cache } from 'react';

import { findPostsCached } from '@/services/db/thoughts';

import PostCardGridPages from '@/components/thoughts/PostCardGridPages';

const findPostsCachedCached = cache(findPostsCached);

export default async function Page({
  searchParams: { page = '1' },
}: {
  searchParams: { page?: string };
}) {
  const POSTS_PER_PAGE = 2;

  console.log(page);

  const posts = await findPostsCachedCached();
  if (!posts || posts.length === 0) return <h1>No Posts</h1>;

  return (
    <PostCardGridPages
      posts={posts}
      currentPage={parseInt(page)}
      postsPerPage={POSTS_PER_PAGE}
    />
  );
}
