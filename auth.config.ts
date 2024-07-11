import type { DefaultSession, NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GitHub from 'next-auth/providers/github';

declare module 'next-auth' {
  interface User {
    // Additional properties here:
    role?: string;
  }
  interface Session extends DefaultSession {
    /**
     * By default, TypeScript merges new interface properties and overwrites existing ones.
     * In this case, the default session user properties will be overwritten,
     * with the new ones defined above. To keep the default session user properties,
     * we need to add them back into the newly declared interface.
     */
    user: DefaultSession['user'] & {
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

export const authConfig = {
  session: { strategy: 'jwt' },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          image: profile.avatar_url,
          role: profile.id === Number(process.env.GITHUB_ID) ? 'admin' : 'user',
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.picture = user.image;
      }
      return token;
    },
    session({ session, token }) {
      session.user.image = token.picture;
      session.user.role = token.role;
      return session;
    },
  },
} satisfies NextAuthConfig;
