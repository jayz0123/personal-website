import { cache } from 'react';

import { Metadata } from 'next';

import clsx from 'clsx';

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
  if (!posts || posts.length === 0) return <h1>No Posts</h1>;

  const post = posts.find((post) => post.slug === postSlug);
  if (!post) return <h1>{`Post ${postSlug} Not Found`}</h1>;

  const res = await fetch(post.url);
  const markdown = await res.text();

  const dateTime = new Date(post.date);

  return (
    <article
      className={clsx(
        'prose dark:prose-invert',
        'md:prose-lg lg:prose-xl',
        'prose-img:rounded-lg prose-img:w-full prose-img:max-w-1 prose-pre:p-0',
        'prose-headings:text-foreground prose-headings:font-bold',
        'prose-p:text-foreground',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-a:relative prose-a:after:content-link prose-pre:rounded-2xl',
      )}
    >
      <h1 className="font-serif font-extrabold text-pretty">{post.title}</h1>

      <div className="flex space-x-4">
        <time dateTime={dateTime.toISOString()}>{post.date}</time>
      </div>

      <PostCoverImage
        src={post.coverImageURL}
        alt={post.title}
        blurDataURL={post.coverImageBlurDataURL}
      />

      <PostContent content={markdown} />
    </article>
  );
}
