import { cache } from 'react';

import { findPostsCached } from '@/services/db/thoughts';

import PostCardGrid from '@/components/thoughts/PostCardGrid';
import PostPagination from '@/components/thoughts/PostPagination';

const findPostsCachedCached = cache(findPostsCached);

export default async function Page() {
  const posts = await findPostsCachedCached();
  if (!posts) {
    return <div>No Posts</div>;
  }

  const postsPerPage = 4;
  const total = Math.ceil(posts.length / postsPerPage);

  return (
    <PostPagination total={total}>
      <PostCardGrid posts={posts} postsPerPage={postsPerPage} />
    </PostPagination>
  );
}
