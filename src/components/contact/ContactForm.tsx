import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { Input, Textarea } from '@nextui-org/input';

import type { IContactForm } from '@/lib/definitions';

import Glowing from '../ui/Glowing';
import { ContactFormButton } from './ContactFormButton';

export function ContactForm() {
  const {
    register,
    getFieldState,
    control,
    reset,
    formState: { isSubmitting, isValid, isDirty, isSubmitSuccessful },
  } = useForm<IContactForm>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      attachments: [],
    },
    progressive: true,
  });

  const [response, setResponse] = useState<string | null>(null);

  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSuccess = async (response: Response) => {
    try {
      const { body } = await response.json();
      setResponse(body); // Update the state with the response body

      // Use setTimeout to reset the form and clear the response after 3 seconds
      setTimeout(() => {
        reset();
        setResponse(null);
      }, 3000);
    } catch (error) {
      console.error('Error processing response:', error);
      // Handle any errors that occur during the fetch operation
    }
  };

  const handleError = async (response: Response | undefined) => {
    if (!response) return;

    try {
      const { body } = await response.json();
      setResponse(body); // Update the state with the response body

      // Use setTimeout to clear the response after 3 seconds
      setTimeout(() => {
        setResponse(null);
      }, 3000);
    } catch (error) {
      console.error('Error processing response:', error);
      // Handle any errors that occur during the fetch operation
    }
  };

  return (
    <div className="w-full h-full flex-1">
      {/* react hook form component */}
      <Form
        action="/api/contact/send"
        headers={{
          'Content-Type': 'application/json',
        }}
        control={control}
        onSubmit={({ data }) => {
          console.log(data);
        }}
        onSuccess={({ response }) => {
          handleSuccess(response);
        }}
        onError={({ response }) => {
          handleError(response);
        }}
        className="flex flex-col space-y-4 items-stretch w-full h-full"
      >
        {/* user's name */}
        <Glowing>
          <Input
            {...register('name')}
            label="Name"
            autoFocus
            isClearable
            isDisabled={isSubmitting}
          />
        </Glowing>

        {/* user's email */}
        <Glowing>
          <Input
            {...register('email', {
              required: 'Please enter an email address',
              pattern: {
                value: regExp,
                message: 'Invalid email address',
              },
            })}
            label="Email"
            isRequired
            isClearable
            isDisabled={isSubmitting}
            isInvalid={getFieldState('email').invalid}
            errorMessage={getFieldState('email').error?.message}
            classNames={{
              helperWrapper: 'absolute right-[36px] bottom-[8px]',
            }}
          />
        </Glowing>

        {/* user's message */}
        <Glowing className="grow min-h-fit">
          <Textarea
            {...register('message', {
              required: 'Please enter a message',
            })}
            label="Message"
            isRequired
            isDisabled={isSubmitting}
            isInvalid={getFieldState('message').invalid}
            errorMessage={getFieldState('message').error?.message}
            minRows={6}
            cacheMeasurements
            classNames={{
              base: 'min-h-full',
              inputWrapper: 'align-start grow',
              input: 'min-h-full grow min-h-full',
              helperWrapper: 'absolute right-[36px] bottom-[8px]',
            }}
          />
        </Glowing>

        {/* file dropdown and send button*/}
        <ContactFormButton
          control={control}
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          isValid={isValid}
          isSubmitSuccessful={isSubmitSuccessful}
          response={response}
        />
      </Form>
    </div>
  );
}
