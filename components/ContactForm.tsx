import { useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';

import {
  CheckIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

import { File } from '@/utils/handleFileUpload';
import FileInput from './FileInput';

interface IFormInput {
  name?: string;
  email: string;
  message: string;
  filename?: string | false | undefined;
  content?: string | Buffer;
}

export function ContactForm() {
  const {
    control,
    reset,
    formState: { isSubmitting, isValid, isDirty, isSubmitSuccessful },
  } = useForm<IFormInput>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      filename: '',
      content: '',
    },
    progressive: true,
  });
  const [response, setResponse] = useState<string | null>(null);

  const IconSize = 24;

  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="w-full h-full flex-1">
      <Form
        action="/api/send"
        headers={{
          'Content-Type': 'application/json',
        }}
        control={control}
        onSubmit={({ data }) => {
          console.log(data);
        }}
        onSuccess={async ({ response }) => {
          const { body } = await response?.json();
          setResponse(() => {
            setTimeout(() => {
              reset();
              setResponse(null);
            }, 3000);
            return body;
          });
        }}
        onError={async ({ response }) => {
          const { body } = await response?.json();
          setResponse(() => {
            setTimeout(() => {
              setResponse(null);
            }, 3000);
            return body;
          });
        }}
        className="flex flex-col space-y-4 items-stretch w-full"
      >
        {/* user's name */}
        <Controller
          name="name"
          control={control}
          render={({
            field: { onChange, value },
            formState: { isSubmitting },
          }) => (
            <Input
              isClearable
              isDisabled={isSubmitting || isSubmitSuccessful}
              value={value}
              onValueChange={onChange}
              type="name"
              label="Name"
            />
          )}
        />

        {/* user's email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Please enter an email address',
            pattern: { value: regExp, message: 'Invalid email address' },
          }}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
            formState: { isSubmitting },
          }) => (
            <Input
              isRequired
              isClearable
              isDisabled={isSubmitting || isSubmitSuccessful}
              value={value}
              onValueChange={onChange}
              isInvalid={invalid}
              errorMessage={error?.message}
              type="email"
              label="Email"
            />
          )}
        />

        {/* user's message */}
        <Controller
          name="message"
          control={control}
          rules={{ required: 'Please enter a message' }}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
            formState: { isSubmitting },
          }) => (
            <Textarea
              isRequired
              isDisabled={isSubmitting || isSubmitSuccessful}
              value={value}
              onValueChange={onChange}
              isInvalid={invalid}
              errorMessage={error?.message}
              label="Message"
              minRows={8}
            />
          )}
        />

        {/* send button */}
        <Button
          type="submit"
          variant={'shadow'}
          color={
            isSubmitting
              ? 'default'
              : isDirty
                ? isValid
                  ? 'success'
                  : 'warning'
                : isSubmitSuccessful
                  ? response
                    ? 'success'
                    : 'danger'
                  : 'default'
          }
          isLoading={isSubmitting}
          isDisabled={isSubmitting || isSubmitSuccessful}
          startContent={
            response && !isSubmitting ? (
              isSubmitSuccessful ? (
                <CheckIcon width={IconSize} height={IconSize} />
              ) : (
                <XMarkIcon width={IconSize} height={IconSize} />
              )
            ) : (
              !isSubmitting && (
                <PaperAirplaneIcon width={IconSize} height={IconSize} />
              )
            )
          }
          aria-label="send button"
          className="text-lg"
        >
          {(!isSubmitting && response) ||
            (isSubmitting ? 'Sending...' : 'Send')}
        </Button>
      </Form>
    </div>
  );
}
