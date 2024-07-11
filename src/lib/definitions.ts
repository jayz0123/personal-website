export interface IContactForm {
  name?: string;
  email: string;
  message: string;
  attachments?: { filename: string; content: string }[];
}

export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from '@auth/core/types';
