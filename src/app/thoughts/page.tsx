import { cache } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import { findPostsCached } from '@/services/db/thoughts';

import { GlowingText } from '@/components/ui';

const findPostsCachedCached = cache(findPostsCached);

export default async function Page() {
  const posts = await findPostsCachedCached();

  if (!posts) {
    return <div>No Posts</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-y-24">
      {posts.map((post, index) => {
        return (
          <div key={index} className="flex flex-col space-y-4">
            <div className="group flex flex-col space-y-4">
              <Link href={`/thoughts/${post.slug}`}>
                <Image
                  src={post.coverImageURL}
                  alt={post.title}
                  placeholder="blur"
                  blurDataURL={post.coverImageBlurDataURL}
                  width={640}
                  height={480}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover rounded-lg aspect-[16/9]"
                />
              </Link>

              <Link href={`/thoughts/${post.slug}`}>
                <h1 className="text-2xl md:text-3xl font-extrabold text-wrap">
                  <GlowingText isActive isHoverable>
                    {post.title}
                  </GlowingText>
                </h1>
              </Link>
            </div>

            <h2>{post.subtitle}</h2>

            <div className="flex space-x-4 text-sm font-mono">
              {post.categories.map((category, index) => {
                return (
                  <Link key={index} href={'123'}>
                    <span>#</span>
                    {category.id}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
