import { cache } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { findPostsCached } from '@/services/db/thoughts';

const findPostsCachedCached = cache(findPostsCached);

export default async function Page() {
  const posts = await findPostsCachedCached();

  if (!posts) {
    return <div>No Posts</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {posts.map((post, index) => {
        return (
          <div key={index} className="col-span-12 lg:col-span-6">
            <Link href={`/thoughts/${post.slug}`}>
              <Image
                src={post.coverImageURL}
                alt={post.title}
                width={600}
                height={400}
                className="object-cover w-[600px] h-[400px] rounded-large"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
