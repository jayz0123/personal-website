import Markdown from 'react-markdown';

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
    <div className="min-w-full prose sm:prose-sm md:prose-md lg:prose-xl xl:prose-xl 2xl:prose-2xl">
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
      <div className="flex space-x-2">
        <label>{data.author}</label>
        <time>{data.date}</time>
      </div>
      <Markdown>{content}</Markdown>
    </div>
  );
}
