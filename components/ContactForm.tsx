'use clinet';

import { useState } from 'react';

import preventEnterKeySubmission from '@/utils/preventEnterKeySubmission';
import { File } from '@/utils/handleFileUpload';

import NameInput from './NameInput';
import EmailInput from './EmailInput';
import MsgInput from './MsgInput';
import SendButton from './SendButton';

interface FeedBack {
  success: boolean;
  prompt: string;
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [feedback, setFeedback] = useState<FeedBack | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          msg,
          filename: file?.name,
          content: file?.content ? file.content.split(',')[1] : undefined,
        }),
      });

      const { body } = await response.json();

      setFeedback({
        success: response.ok,
        prompt:
          body === 'validation_error'
            ? 'Invalid email address'
            : body === 'invalid_attachment'
              ? 'File type not supported'
              : body,
      });
    } catch (error) {
      setFeedback({ success: false, prompt: 'Try again later' });
    } finally {
      setIsSent(() => {
        setIsSending(false);
        setTimeout(() => {
          setIsSent(false);
        }, 3000);
        return true;
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => preventEnterKeySubmission(e)}
      className="flex flex-col flex-1 space-y-4 items-stretch w-full h-full"
    >
      <NameInput isSending={isSending} onTextChange={setName} />
      <EmailInput isSending={isSending} onTextChange={setEmail} />
      <MsgInput
        isSending={isSending}
        onTextChange={setMsg}
        onFileChange={setFile}
      />
      <SendButton
        isSending={isSending}
        isSent={isSent}
        success={feedback?.success}
        prompt={feedback?.prompt}
      />
    </form>
  );
}
