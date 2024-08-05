import { cache } from 'react';

import { findPostsCached } from '@/services/db/thoughts';

import PostCardGrid from '@/components/thoughts/PostCardGrid';

const findPostsCachedCached = cache(findPostsCached);

export default async function Page() {
  const posts = await findPostsCachedCached();

  if (!posts) {
    return <div>No Posts</div>;
  }

  return <PostCardGrid posts={posts} />;
}
