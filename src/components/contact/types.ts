export interface IFormInput {
  name?: string;
  email: string;
  message: string;
  attachments?: { filename: string; content: string }[];
}
