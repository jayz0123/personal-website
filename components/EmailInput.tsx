'use client';

import { useState, useRef, useEffect } from 'react';

import { EnvelopeIcon } from '@heroicons/react/24/solid';
import validateEmail from '@/utils/validateEmail';

export default function EmailInput({
  onTextChange,
  isSending,
  size = 24,
}: {
  onTextChange: (arg0: string) => void;
  isSending: boolean;
  size?: number;
}) {
  const [isValidEmail, setIsValidEmail] = useState<boolean | undefined>(
    undefined,
  );

  return (
    <label
      className={`input input-bordered ${
        isValidEmail === false && 'input-error'
      }  text-lg flex items-center gap-2`}
      data-tip="Not a valid email address!"
      aria-label="message input"
    >
      <EnvelopeIcon
        width={size}
        height={size}
        className={`${isValidEmail === false && !isSending && 'text-error'}`}
      />
      <input
        type="text"
        className="grow"
        placeholder="Your email address"
        onFocus={() => {
          setIsValidEmail(undefined);
        }}
        onChange={(e) => onTextChange(e.target.value)}
        onBlur={(e) => setIsValidEmail(validateEmail(e.target.value))}
        disabled={isSending}
        required
      />
      <span className="badge">Required</span>
    </label>
  );
}
