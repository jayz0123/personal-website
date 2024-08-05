import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import {
  THOUGHTS_REMOTE_PREFIX,
  generateRemoteDirForPrefix,
  uploadToRemote,
} from '@/services';

import { convertBase64ToBuffer } from '@/utils/fileHelpers';
import { generateblurDataURL } from '@/utils/imageHelpers';

import { createPost } from '@/services/db/thoughts';

export async function POST(request: NextRequest) {
  try {
    const { title, subtitle, categories, coverImages, posts, published } =
      await request.json();

    const coverImage = coverImages[0];
    const post = posts[0];

    const slug = title.replace(/ /g, '-').toLowerCase();

    const coverImageBuffer = convertBase64ToBuffer(coverImage.content);
    const postBuffer = convertBase64ToBuffer(post.content);

    const coverImageRemoteDir = generateRemoteDirForPrefix(
      THOUGHTS_REMOTE_PREFIX,
      'posts',
      slug,
      'cover-image',
    );
    const remoteDir = generateRemoteDirForPrefix(
      THOUGHTS_REMOTE_PREFIX,
      'posts',
      slug,
      'markdown',
    );

    const url = await uploadToRemote(postBuffer, remoteDir, post.fileType);
    const coverImageURL = await uploadToRemote(
      coverImageBuffer,
      coverImageRemoteDir,
      coverImage.fileType,
    );
    const coverImageBlurDataURL = await generateblurDataURL(coverImageURL);

    const id = await createPost({
      postData: {
        url,
        coverImageURL,
        coverImageBlurDataURL,
        slug,
        title,
        subtitle,
        published,
      },
      categories,
    });

    revalidateTag('posts');

    return NextResponse.json({ body: `Post ${id} Uploaded` }, { status: 200 });
  } catch {
    return NextResponse.error();
  }
}
