'use client';

import { memo, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import { ThoughtsPost } from '@/lib/definitions';

import { PostCard } from './';

const PostCardGrid = memo(function PostCardGrid({
  posts,
  postsPerPage,
}: {
  posts: ThoughtsPost[];
  postsPerPage: number;
}) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const paginatedPosts = useMemo(() => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    return posts.slice(startIndex, endIndex);
  }, [page, postsPerPage, posts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-x-24 lg:gap-y-16">
      {paginatedPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
});

export default PostCardGrid;
