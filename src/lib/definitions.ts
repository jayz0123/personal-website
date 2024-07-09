export interface IContactForm {
  name?: string;
  email: string;
  message: string;
  attachments?: { filename: string; content: string }[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
