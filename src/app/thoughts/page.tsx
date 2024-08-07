import { cache } from 'react';

import { findPostsCached } from '@/services/db/thoughts';

import PostCardGridPages from '@/components/thoughts/PostCardGridPages';

const findPostsCachedCached = cache(findPostsCached);

export default async function Page() {
  const posts = await findPostsCachedCached();
  if (!posts || posts.length === 0) return <h1>No Posts</h1>;

  const postsPerPage = 4;

  return <PostCardGridPages posts={posts} postsPerPage={postsPerPage} />;
}
