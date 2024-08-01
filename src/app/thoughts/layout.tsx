import { authCached } from '@/auth';

import { PostUploadForm } from '@/components/thoughts/admin/PostUploadForm';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCached();

  return (
    <section>
      {children}
      {session?.user?.role === 'admin' && <PostUploadForm />}
    </section>
  );
}
