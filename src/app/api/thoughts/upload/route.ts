import { NextRequest, NextResponse } from 'next/server';

import {
  THOUGHTS_REMOTE_PREFIX,
  generateRemoteDirForPrefix,
  uploadToRemote,
} from '@/services';

import type { ThoughtsPostUploadForm } from '@/lib/definitions';

import convertBase64ToBuffer from '@/utils/convertBase64ToBuffer';

import { createPost } from '@/services/db/thoughts';

export async function POST(request: NextRequest) {
  try {
    const { title, description, published, post, categories } =
      (await request.json()) as ThoughtsPostUploadForm;

    const postBuffer = convertBase64ToBuffer(post[0].content);
    const remoteDir = generateRemoteDirForPrefix(
      THOUGHTS_REMOTE_PREFIX,
      'posts',
      post[0].fileName.replace(/ /g, '-'),
    );

    const url = await uploadToRemote(postBuffer, remoteDir, post[0].fileType);

    const id = await createPost({
      postData: {
        title,
        description,
        url,
        published,
      },
      categories,
    });

    return NextResponse.json({ body: `Post Uploaded` }, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
