"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  UserIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

export default function Contact() {
  // const form = useRef<HTMLFormElement>(null);
  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userMessage = useRef<HTMLTextAreaElement>(null);
  const userFile = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);

  const size = 24;

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [myServiceID, myTemplateID, myPublicKey] = [
      "service_3z476pn",
      "template_tpkg6jo",
      "eC1d_-MEz99ERo6pl",
    ];

    const currentUserName = userName.current as HTMLInputElement;
    const currentUserEmail = userEmail.current as HTMLInputElement;
    const currentUserMessage = userMessage.current as HTMLTextAreaElement;
    const currentUserFile = userFile.current as HTMLInputElement;

    const sentContent = {
      from_name: currentUserName.value,
      from_email: currentUserEmail.value,
      message: currentUserMessage.value,
      file: currentUserFile.files,
    };

    try {
      setIsSending(true);
      const result = await emailjs.send(
        myServiceID,
        myTemplateID,
        sentContent,
        myPublicKey
      );
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row xl:my-32 xl:space-x-10 my-10">
      <h2 className="text-xl mb-10 font-bold">
        Got something to say or just want to share a funny cat meme? Drop me a
        message!
      </h2>
      <form onSubmit={sendEmail} className="flex flex-col grow space-y-4">
        <label className="input input-bordered text-lg flex items-center gap-2">
          <UserIcon width={size} height={size} />
          <input
            ref={userName}
            type="text"
            className="grow"
            placeholder="Your name"
            required
          />
        </label>
        <label className="input input-bordered text-lg flex items-center gap-2">
          <EnvelopeIcon width={size} height={size} />
          <input
            ref={userEmail}
            type="text"
            className="grow"
            placeholder="Your email address"
            required
          />
        </label>
        <textarea
          ref={userMessage}
          name="message"
          className="textarea textarea-bordered grow min-h-[28rem] text-lg mb-5"
          placeholder="Type your message here..."
          required
        />
        <input
          ref={userFile}
          type="file"
          className="file-input file-input-bordered w-full"
        />
        <button
          disabled={isSending}
          type="submit"
          className="btn text-xl self-center"
        >
          {isSending ? (
            <span className="loading loading-spinner" />
          ) : (
            <PaperAirplaneIcon width={size} height={size} />
          )}
          {`${isSending ? "Sending" : "Send Message"}`}
        </button>
      </form>
    </div>
  );
}
