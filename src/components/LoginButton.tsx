import Image from 'next/image';

import { auth, signIn, signOut } from '@/auth';

import { CommandLineIcon } from './ui/Icons';

export async function LoginButton() {
  const session = await auth();
  const loggedIn = session?.user !== undefined;

  return (
    <form
      action={async () => {
        'use server';
        if (loggedIn) await signOut();

        await signIn('github');
      }}
      className="flex"
    >
      <button type="submit">
        {loggedIn ? (
          <Image
            src={session.user?.image!}
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full"
          />
        ) : (
          <CommandLineIcon />
        )}
      </button>
    </form>
  );
}
