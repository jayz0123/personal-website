import { authCached } from '@/auth';

import RevalidateButton from '@/components/admin/RevalidateButton';
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
      {session?.user?.role === 'admin' && (
        <div className="flex flex-col mt-16 min-w-full gap-y-4">
          <RevalidateButton tag="posts">Revalidate Posts</RevalidateButton>
          <PostUploadForm />
        </div>
      )}
    </section>
  );
}
