import { MDXRemote } from 'next-mdx-remote/rsc';

import { findPostsCached } from '@/services/db/thoughts';

export default async function RemoteMdxPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await fetch('https://s3.howiejayz.com/thoughts/posts/page.mdx');
  const markdown = await res.text();

  return (
    <div className="min-w-full prose sm:prose-sm md:prose-md lg:prose-xl xl:prose-xl 2xl:prose-2xl">
      <MDXRemote source={markdown} />
    </div>
  );
}
