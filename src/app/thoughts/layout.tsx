import { authCached } from '@/auth';

import { PostUploadForm } from '@/components/thoughts/admin/PostUploadForm';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCached();

  return (
    <section className="flex flex-col items-center min-w-full grow self-start py-8">
      {children}
      {session?.user?.role === 'admin' && <PostUploadForm />}
    </section>
  );
}
