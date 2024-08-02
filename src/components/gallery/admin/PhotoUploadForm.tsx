'use client';

import { ChangeEvent } from 'react';
import { Form, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';

import type { GalleryPhotoUploadForm } from '@/lib/definitions';

import { readFiles } from '@/utils/fileHelpers';

export function PhotoUploadForm() {
  const {
    register,
    getFieldState,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<GalleryPhotoUploadForm>({
    defaultValues: {
      title: '',
      country: '',
      area: '',
      photos: [{ fileName: '', fileType: '', content: '' }],
      isCover: false,
    },
    progressive: true,
  });

  const { fields, replace, remove } = useFieldArray({
    control,
    name: 'photos',
  });

  const handleAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, replace);
  };

  return (
    <Form
      action="/api/gallery/upload"
      headers={{
        'Content-Type': 'application/json',
      }}
      onSubmit={({ data }) => {
        console.log(data);
      }}
      onSuccess={() => {
        reset();
      }}
      control={control}
      className="flex flex-col space-y-2"
    >
      <Input
        {...register('title', {
          required: 'Please enter the title',
        })}
        label="Title"
        isRequired
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

      <div className="flex flex-col justify-center gap-2 self-stretch">
        <label className="self-center">Photo</label>
        <Input type="file" onChange={handleAddPhoto} accept="image/*" />
      </div>

      <Checkbox {...register('isCover')} />

      <Button type="submit" isDisabled={isSubmitting || fields.length === 0}>
        Submit
      </Button>
    </Form>
  );
}
