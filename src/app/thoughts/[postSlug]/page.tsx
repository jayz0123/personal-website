import { cache } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Image from 'next/image';

import clsx from 'clsx';
import matter from 'gray-matter';

import { findPostsCached } from '@/services/db/thoughts';

const findPostsCachedCached = cache(findPostsCached);

type GenerateStaticParams = () => Promise<{ postSlug: string }[]>;

export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const posts = await findPostsCached();

    if (!posts) return [];

    return posts.map(({ slug }) => ({ postSlug: slug }));
  };
}

export default async function RemoteMdxPage({
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
        'prose-p: text-foreground',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-a:relative prose-a:after:content-link',
      )}
    >
      <h1 className="font-serif font-extrabold">{data.title}</h1>

      <div className="flex space-x-4">
        <address>{data.author}</address>
        <time dateTime={data.date}>{data.date}</time>
      </div>

      <Image
        src={post.coverImageURL}
        alt={postSlug}
        placeholder="blur"
        blurDataURL={post.coverImageBlurDataURL}
        width={800}
        height={400}
        className="aspect-[16/9] object-cover"
      />

      <Markdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                customStyle={{ margin: 0 }}
                PreTag="div"
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}
