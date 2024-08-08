import { Metadata } from 'next';

import { authCached } from '@/auth';

import RevalidateButton from '@/components/admin/RevalidateButton';
import { PostPagination } from '@/components/thoughts';
import PostUploadForm from '@/components/thoughts/admin/PostUploadForm';

export const metadata: Metadata = {
  title: {
    template: '%s | Thoughts',
    default: 'Thoughts',
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCached();

  return (
    <section
      aria-label="thoughts"
      className="lg:max-w-[calc(130ch+4rem)] m-auto"
    >
      {children}
      {session?.user?.role === 'admin' && (
        <div className="flex flex-col mt-16 gap-y-4">
          <RevalidateButton tag="posts">Revalidate Posts</RevalidateButton>
          <PostUploadForm />
        </div>
      )}
    </section>
  );
}
