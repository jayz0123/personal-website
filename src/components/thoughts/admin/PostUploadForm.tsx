'use client';

import { ChangeEvent } from 'react';
import { Form, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';

import { readFiles } from '@/utils/fileHelpers';

export function PostUploadForm() {
  const {
    register,
    getFieldState,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      subtitle: '',
      categories: [{ name: '' }],
      coverImages: [{ fileName: '', fileType: '', content: '' }],
      posts: [{ fileName: '', fileType: '', content: '' }],
      published: true,
    },
    progressive: true,
  });

  const { fields: coverImagesFields, replace: coverImagesReplace } =
    useFieldArray({
      control,
      name: 'coverImages',
    });

  const { fields: postsFields, replace: postsReplace } = useFieldArray({
    control,
    name: 'posts',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const handleAddCoverImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, coverImagesReplace);
  };

  const handleAddPosts = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, postsReplace);
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
        {...register('subtitle', {
          required: 'Please enter the subtitle',
        })}
        label="Subtitle"
        isRequired
        isClearable
        isDisabled={isSubmitting}
        isInvalid={getFieldState('subtitle').invalid}
        errorMessage={getFieldState('subtitle').error?.message}
      />

      {fields.map((fields, index) => (
        <div key={fields.id} className="flex items-center gap-2">
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

      <div className="flex flex-col justify-center gap-2 self-stretch">
        <label className="self-center">Cover Image</label>
        <Input type="file" onChange={handleAddCoverImages} accept="image/*" />
      </div>

      <div className="flex flex-col justify-center gap-2 self-stretch">
        <label className="self-center">Post</label>
        <Input type="file" onChange={handleAddPosts} accept=".md,.mdx" />
      </div>

      <Checkbox {...register('published')} defaultChecked />

      <Button type="submit" isDisabled={isSubmitting || fields.length === 0}>
        Submit
      </Button>
    </Form>
  );
}
