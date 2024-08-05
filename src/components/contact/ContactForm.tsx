'use client';

import { useState } from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';

import type { ContactEmailSendForm } from '@/lib/definitions';

import { ContactFormButton, EmailInput, MessageInput, NameInput } from '.';

export function ContactForm() {
  const methods = useForm<ContactEmailSendForm>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      attachments: [],
    },
    progressive: true,
  });

  const [response, setResponse] = useState<string | null>(null);

  const { reset } = methods;

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
    <FormProvider {...methods}>
      <Form
        action="/api/contact/send"
        headers={{
          'Content-Type': 'application/json',
        }}
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
        <NameInput />
        <EmailInput />
        <MessageInput />
        <ContactFormButton response={response} />
      </Form>
    </FormProvider>
  );
}
