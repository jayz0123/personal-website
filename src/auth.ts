import { cache } from 'react';

import NextAuth from 'next-auth';

import { authConfig } from '../auth.config';

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
});

export const authCached = cache(() => auth().catch(() => null));
