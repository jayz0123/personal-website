import Markdown from 'react-markdown';

import Image from 'next/image';

import matter from 'gray-matter';

import { findPostsCached } from '@/services/db/thoughts';

type GenerateStaticParams = () => Promise<{ postSlug: string }[]>;

export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const posts = await findPostsCached();
    console.log(posts);

    if (!posts) return [];

    return posts.map(({ slug }) => ({ postSlug: slug }));
  };
}

export default async function RemoteMdxPage({
  params: { postSlug },
}: {
  params: { postSlug: string };
}) {
  const res = await fetch(
    `https://s3.howiejayz.com/thoughts/posts/${postSlug}/post.mdx`,
  );
  const markdownWithFrontMatter = await res.text();

  const { data, content } = matter(markdownWithFrontMatter);

  return (
    <article>
      <Image
        src={`https://resizer.howiejayz.com/thoughts/posts/${postSlug}/cover.JPG`}
        alt={postSlug}
        width={800}
        height={400}
        className="w-[800px] h-[400px] object-cover aspect-video"
      />
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
      <div className="flex space-x-2">
        <label>{data.author}</label>
        <time>{data.date}</time>
      </div>
      <Markdown>{content}</Markdown>
    </article>
  );
}
