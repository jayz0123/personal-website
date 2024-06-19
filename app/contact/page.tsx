"use client";

import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface FeedBack {
  success: boolean;
  prompt: string;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [filename, setFilename] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showTip, setShowTip] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [feedback, setFeedback] = useState<FeedBack | null>(null);

  const size = 24;

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsValidEmail(re.test(email) || email === "");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files?.length === 0) {
      setFilename(null);
      setFile(null);
      return;
    }

    // console.log(files);
    const reader = new FileReader();
    reader.onload = (r: ProgressEvent<FileReader>) => {
      if (r.target && r.target.result) {
        setFilename(files[0].name);
        setFile(r.target.result.toString());
      }
    };

    reader.readAsDataURL(files[0]);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      setShowTip(() => {
        setTimeout(() => {
          setShowTip(false);
        }, 3000);
        return true;
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          msg,
          filename,
          content: file ? file.split(",")[1] : null,
        }),
      });

      if (response.ok) setFeedback({ success: true, prompt: "Message sent!" });
      else setFeedback({ success: false, prompt: "File type not accepted!" });
    } catch (error) {
      setFeedback({ success: false, prompt: "Try again later!" });
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
            className="grow"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            disabled={isSending}
          />
        </label>
        {/* <div className={``} data-tip="Not a valid email address."> */}
        <label
          className={`input input-bordered ${
            !isValidEmail && "input-error tooltip tooltip-error"
          } text-lg flex items-center gap-2 ${showTip && "tooltip-open"}`}
          data-tip="Not a valid email address!"
        >
          <EnvelopeIcon width={size} height={size} />

          <input
            type="text"
            className="grow"
            placeholder="Your email address"
            onFocus={() => {
              setIsValidEmail(true);
              setShowTip(false);
            }}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail(e.target.value)}
            disabled={isSending}
            required
          />

          <span className="badge">Required</span>
        </label>
        {/* </div> */}
        <textarea
          name="message"
          className="flex-1 textarea textarea-bordered text-lg"
          placeholder="Type your message here..."
          onChange={(e) => setMsg(e.target.value)}
          disabled={isSending}
        />
        <input
          type="file"
          className="file-input file-input-bordered "
          onChange={handleFileUpload}
          disabled={isSending}
        />
        <button
          disabled={isSending}
          type="submit"
          className={`btn text-xl self-center ${
            isSent
              ? feedback?.success
                ? "btn-success"
                : "btn-error"
              : "btn-ghost"
          }`}
        >
          {isSending ? (
            <span className="loading loading-spinner" />
          ) : isSent ? (
            feedback?.success ? (
              <CheckIcon width={size} height={size} />
            ) : (
              <XMarkIcon width={size} height={size} />
            )
          ) : (
            <PaperAirplaneIcon width={size} height={size} />
          )}
          {isSending ? "Sending" : isSent ? feedback?.prompt : "Send Message"}
        </button>
      </form>
    </div>
  );
}
