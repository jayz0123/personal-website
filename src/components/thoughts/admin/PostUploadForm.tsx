'use client';

import { ChangeEvent, useRef } from 'react';
import { Form, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';

import type { ThoughtsPostUploadForm } from '@/lib/definitions';

import readFiles from '@/utils/readFiles';

import { FileAddIcon } from '@/components/ui/Icons';

export function PostUploadForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    setValue,
    register,
    getFieldState,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      published: false,
      post: [{ fileName: '', fileType: '', content: '' }],
      categories: [{ name: '' }],
    },
    progressive: true,
  });

  const { fields: postFields, replace: postReplace } = useFieldArray({
    control,
    name: 'post',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const handleAddFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, postReplace);
  };

  return (
    <Form
      action="/api/thoughts/upload"
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
        {...register('description')}
        label="Description"
        isClearable
        isDisabled={isSubmitting}
        isInvalid={getFieldState('description').invalid}
        errorMessage={getFieldState('description').error?.message}
      />

      {postFields.map((postFields, index) => (
        <div key={postFields.id} className="flex items-center gap-2">
          <Input
            {...register(`categories.${index}.name` as const, {
              required: 'Please enter the category',
            })}
            label="Category"
            isRequired
            isClearable
            isDisabled={isSubmitting}
            isInvalid={
              getFieldState(`categories.${index}.name` as const).invalid
            }
            errorMessage={
              getFieldState(`categories.${index}.name` as const).error?.message
            }
          />
          <Button onClick={() => remove(index)}>Delete</Button>
        </div>
      ))}

      <Button onClick={() => append({ name: '' })}>Append</Button>

      <div className="flex justify-between gap-2 self-stretch">
        <Button
          onPress={() => {
            fileInputRef.current?.click();
          }}
          startContent={<FileAddIcon />}
          className="grow"
        >
          <span>Add a new post</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAddFiles}
            className="hidden"
          />
        </Button>
        <Checkbox {...register('published')} />
      </div>

      <Button type="submit" isDisabled={isSubmitting || fields.length === 0}>
        Submit
      </Button>
    </Form>
  );
}
