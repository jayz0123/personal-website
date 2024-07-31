import { cache } from 'react';

import { authCached } from '@/auth';

import { PostUploadForm } from '@/components/thoughts/admin/PostUploadForm';

const authCachedCached = cache(authCached);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCachedCached();

  return (
    <section>
      {children}
      {session?.user?.role === 'admin' && <PostUploadForm />}
    </section>
  );
}
