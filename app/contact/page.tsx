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
    <div className="flex flex-col xl:flex-row xl:space-x-10 my-10 grow">
      <h2 className="text-xl mb-10 font-bold flex-none">
        Got something to say or just want to share a funny cat meme? Drop me a
        message!
      </h2>
      <form
        onSubmit={sendEmail}
        className="flex flex-col flex-1 space-y-4 items-stretch"
      >
        <label className="input input-bordered text-lg flex items-center gap-2">
          <UserIcon width={size} height={size} />
          <input
            ref={userName}
            type="text"
            className=""
            placeholder="Your name"
          />
        </label>
        <label className="input input-bordered text-lg flex items-center gap-2">
          <EnvelopeIcon width={size} height={size} />
          <input
            ref={userEmail}
            type="text"
            className=""
            placeholder="Your email address"
            required
          />
        </label>
        <textarea
          ref={userMessage}
          name="message"
          className="flex-1 textarea textarea-bordered text-lg"
          placeholder="Type your message here..."
          required
        />
        <input
          ref={userFile}
          type="file"
          className="file-input file-input-bordered "
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
