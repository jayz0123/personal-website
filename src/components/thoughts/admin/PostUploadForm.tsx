'use client';

import { ChangeEvent } from 'react';
import { Form, useFieldArray, useForm } from 'react-hook-form';

import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';

import { ThoughtsPostUploadForm } from '@/lib/definitions';

import { readFiles } from '@/utils/fileHelpers';

export default function PostUploadForm() {
  const {
    register,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ThoughtsPostUploadForm>({
    defaultValues: {
      coverImages: [],
      posts: [],
      published: true,
    },
    progressive: true,
  });

  const { fields: coverImagesFields, append: coverImagesAppend } =
    useFieldArray({
      control,
      name: 'coverImages',
    });

  const { fields: postsFields, append: postsAppend } = useFieldArray({
    control,
    name: 'posts',
  });

  const handleAddCoverImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, coverImagesAppend);
  };

  const handleAddPosts = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    readFiles(event.target.files, postsAppend, 'text');
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
      <div className="flex flex-col justify-center gap-2 self-stretch">
        <label className="self-center">Posts</label>
        <Input
          multiple
          type="file"
          onChange={handleAddPosts}
          accept=".md,.mdx"
        />
      </div>

      <div className="flex flex-col justify-center gap-2 self-stretch">
        <label className="self-center">Cover Images</label>
        <Input
          multiple
          type="file"
          onChange={handleAddCoverImages}
          accept="image/*"
        />
      </div>

      <Checkbox {...register('published')} defaultChecked />

      <Button
        type="submit"
        isDisabled={
          isSubmitting ||
          postsFields.length === 0 ||
          postsFields.length !== coverImagesFields.length
        }
      >
        Submit
      </Button>
    </Form>
  );
}
