'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Form, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

import { IGalleryPhotoUpload } from '@/lib/definitions';

import readFiles from '@/utils/readFiles';

import { FileAddIcon } from '@/components/ui/Icons';

export function PhotoUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    getFieldState,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<IGalleryPhotoUpload>({
    defaultValues: {
      title: '',
      country: '',
      area: '',
      photos: [],
    },
    progressive: true,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'photos',
  });

  const handleAddFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, append);
  };

  return (
    <Form
      action="/api/gallery/upload"
      headers={{
        'Content-Type': 'application/json',
      }}
      // onSubmit={({ data }) => {
      //   console.log(data);
      // }}
      onSuccess={() => {
        reset();
      }}
      control={control}
      className="flex flex-col space-y-2"
    >
      <Input
        {...register('title')}
        label="Title"
        isClearable
        isDisabled={isSubmitting}
        isInvalid={getFieldState('title').invalid}
        errorMessage={getFieldState('title').error?.message}
      />
      <Input
        {...register('country', {
          required: 'Please enter the country',
        })}
        label="Country"
        isRequired
        isClearable
        isDisabled={isSubmitting}
        isInvalid={getFieldState('country').invalid}
        errorMessage={getFieldState('country').error?.message}
      />
      <Input
        {...register('area', {
          required: 'Please enter the area',
        })}
        label="Area"
        isRequired
        isClearable
        isDisabled={isSubmitting}
        isInvalid={getFieldState('area').invalid}
        errorMessage={getFieldState('area').error?.message}
      />
      <Button
        onPress={() => {
          fileInputRef.current?.click();
        }}
        startContent={<FileAddIcon />}
      >
        <span>Attach new files</span>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleAddFiles}
          className="hidden"
        />
      </Button>
      <Button type="submit" isDisabled={isSubmitting || fields.length === 0}>
        Submit
      </Button>
    </Form>
  );
}
