'use client';

import { memo, useMemo } from 'react';

import { ThoughtsPost } from '@/lib/definitions';

import { useQueryString } from '@/utils/hooks';

import { PostCardGrid, PostPagination } from './';

export const PostCardGridPages = memo(function PostCardGridPages({
  posts,
  currentPage,
  postsPerPage,
}: {
  posts: ThoughtsPost[];
  currentPage: number;
  postsPerPage: number;
}) {
  const getAllQueryString = useQueryString('getAll');

  const filteredPosts = useMemo(() => {
    const categoryQueries = new Set(getAllQueryString('category'));

    if (categoryQueries.size === 0) {
      return posts;
    }

    return posts.filter((post) => {
      const postCategories = new Set(post.categories.map((cat) => cat.slug));
      // Check if all categories are present in the post's categories
      return [...categoryQueries].every((categoryQuery) =>
        postCategories.has(categoryQuery),
      );
    });
  }, [getAllQueryString, posts]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    return filteredPosts.slice(startIndex, endIndex);
  }, [currentPage, postsPerPage, filteredPosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <PostPagination currentPage={currentPage} total={totalPages}>
      <PostCardGrid posts={paginatedPosts} />
    </PostPagination>
  );
});

export default PostCardGridPages;
