"use client";

import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

interface ResponseData {
  success?: boolean;
  error?: string;
}

export default function Contact() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [content, setContent] = useState("");
  const [filename, setFilename] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);

  const size = 24;

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const base64Content = content.split(",")[1];

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          userEmail,
          userMessage,
          base64Content,
          filename,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Internal Server Error" });
    } finally {
      setIsSending(false);
    }
  };

  const onAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = e.target.files as FileList;

    reader.onload = (r: ProgressEvent<FileReader>) => {
      if (r.target === null) return;
      if (r.target.result === null) return;

      setContent(r.target.result.toString());
      setFilename(files[0].name);
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:space-x-20 my-12 xl:my-32 grow items-center">
      <h2 className="text-xl mb-10 font-bold flex-none">
        Got something to say or just want to share a funny cat meme? Drop me a
        message!
      </h2>
      <form
        onSubmit={sendEmail}
        className="flex flex-col flex-1 space-y-4 items-stretch w-full h-full"
      >
        <label className="input input-bordered text-lg flex items-center gap-2">
          <UserIcon width={size} height={size} />
          <input
            type="text"
            className=""
            placeholder="Your name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label className="input input-bordered text-lg flex items-center gap-2">
          <EnvelopeIcon width={size} height={size} />
          <input
            type="text"
            className=""
            placeholder="Your email address"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>
        <textarea
          name="message"
          className="flex-1 textarea textarea-bordered text-lg"
          placeholder="Type your message here..."
          onChange={(e) => setUserMessage(e.target.value)}
          required
        />
        <input
          type="file"
          className="file-input file-input-bordered "
          onChange={onAddFile}
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
          {isSending ? "Sending" : "Send Message"}
        </button>
      </form>
      {response && (
        <div>
          {response.error ? (
            <p style={{ color: "red" }}>{response.error}</p>
          ) : (
            <p style={{ color: "green" }}>Message sent successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}
