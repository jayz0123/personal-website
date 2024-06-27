import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import {
  CheckIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

import { Input, Textarea } from '@nextui-org/input';
import { Button, ButtonGroup } from '@nextui-org/button';

import FileDropdown from './FileDropdown';

interface IFormInput {
  name?: string;
  email: string;
  message: string;
  filename?: string | false | undefined;
  content?: string | Buffer;
}

export default function ContactForm() {
  const {
    register,
    getFieldState,
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
      {/* react hook form component */}
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
        className="flex flex-col space-y-4 items-stretch w-full h-full"
      >
        {/* user's name */}
        <Input
          {...register('name')}
          label="Name"
          isClearable
          isDisabled={isSubmitting || isSubmitSuccessful}
        />

        {/* user's email */}
        <Input
          {...register('email', {
            required: 'Please enter an email address',
            pattern: { value: regExp, message: 'Invalid email address' },
          })}
          label="Email"
          isRequired
          isClearable
          isDisabled={isSubmitting || isSubmitSuccessful}
          isInvalid={getFieldState('email').invalid}
          errorMessage={getFieldState('email').error?.message}
        />

        {/* user's message */}
        <Textarea
          {...register('message', { required: 'Please enter a message' })}
          label="Message"
          isRequired
          isDisabled={isSubmitting || isSubmitSuccessful}
          isInvalid={getFieldState('message').invalid}
          errorMessage={getFieldState('message').error?.message}
          minRows={6}
          className="flex-1"
          classNames={{
            inputWrapper: 'grow',
            input: 'min-h-full',
          }}
        />

        {/* file dropzone */}
        {/* <FileDropzone /> */}

        {/* send button */}
        <ButtonGroup className="w-full">
          <FileDropdown />
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
            className="text-lg w-full"
          >
            {(!isSubmitting && response) ||
              (isSubmitting ? 'Sending...' : 'Send')}
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}
