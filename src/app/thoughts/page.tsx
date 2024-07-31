import { cache } from 'react';

import { findPostsCached } from '@/services/db/thoughts';

const findPostsCachedCached = cache(findPostsCached);

export default async function Page() {
  const posts = await findPostsCachedCached();

  if (!posts) {
    return <div>No Posts</div>;
  }

  return <div>{posts.length}</div>;
}
