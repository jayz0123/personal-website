import { cache } from 'react';

import { Metadata } from 'next';

import clsx from 'clsx';
import matter from 'gray-matter';

import { findPostsCached } from '@/services/db/thoughts';

import { PostCoverImage } from '@/components/thoughts';
import { PostContent } from '@/components/thoughts/post/PostContent';

const findPostsCachedCached = cache(findPostsCached);

export async function generateMetadata({
  params: { postSlug },
}: {
  params: { postSlug: string };
}): Promise<Metadata | undefined> {
  const posts = await findPostsCachedCached();
  if (!posts) return;

  const post = posts.find((post) => post.slug === postSlug);
  if (!post) return;

  return {
    title: post.title,
    openGraph: {
      images: post.coverImageURL,
      publishedTime: post.createdAt.toString(),
      modifiedTime: post.updatedAt.toString(),
    },
  };
}

type GenerateStaticParams = () => Promise<{ postSlug: string }[]>;
export const dynamicParams = false;
export let generateStaticParams: GenerateStaticParams;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const posts = await findPostsCachedCached();

    if (!posts) return [];

    return posts.map(({ slug }) => ({ postSlug: slug }));
  };
}

export default async function Page({
  params: { postSlug },
}: {
  params: { postSlug: string };
}) {
  const posts = await findPostsCachedCached();
  if (!posts) {
    return <div>No Posts</div>;
  }

  const post = posts.find((post) => post.slug === postSlug);
  if (!post) {
    return <div>No Post</div>;
  }

  const res = await fetch(post.url);
  const markdownWithFrontMatter = await res.text();

  const { data, content } = matter(markdownWithFrontMatter);

  return (
    <article
      className={clsx(
        'prose dark:prose-invert',
        'md:prose-lg lg:prose-xl',
        'prose-img:rounded-lg prose-pre:p-0',
        'prose-headings:text-foreground prose-headings:font-bold',
        'prose-p:text-foreground',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-a:relative prose-a:after:content-link prose-pre:rounded-2xl',
      )}
    >
      <h1 className="font-serif font-extrabold">{data.title}</h1>

      <div className="flex space-x-4">
        <time dateTime={data.date}>{data.date}</time>
      </div>

      <PostCoverImage
        src={post.coverImageURL}
        alt={post.title}
        blurDataURL={post.coverImageBlurDataURL}
      />

      <PostContent content={content} />
    </article>
  );
}
