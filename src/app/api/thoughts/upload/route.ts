import { NextRequest, NextResponse } from 'next/server';

import {
  THOUGHTS_REMOTE_PREFIX,
  generateRemoteDirForPrefix,
  uploadToRemote,
} from '@/services';

import { convertBase64ToBuffer } from '@/utils/fileHelpers';

import { createPost } from '@/services/db/thoughts';

const generateThumbnailURL = (url: string) => {
  return `${url}?format=auto&quality=75&width=640`;
};

export async function POST(request: NextRequest) {
  try {
    const { title, subtitle, categories, coverImages, posts, published } =
      await request.json();

    const extractExtensionRe = /(?:\.([^.]+))?$/;

    const coverImage = coverImages[0];
    const post = posts[0];

    const slug = title.replace(/ /g, '-').toLowerCase();

    const coverImageBuffer = convertBase64ToBuffer(coverImage.content);
    const postBuffer = convertBase64ToBuffer(post.content);

    const coverImageRemoteDir = generateRemoteDirForPrefix(
      THOUGHTS_REMOTE_PREFIX,
      'posts',
      slug,
      'cover.' +
        extractExtensionRe.exec(coverImage.fileName)?.[1].toLowerCase(),
    );
    const remoteDir = generateRemoteDirForPrefix(
      THOUGHTS_REMOTE_PREFIX,
      'posts',
      slug,
      'post.' + extractExtensionRe.exec(post.fileName)?.[1].toLowerCase(),
    );

    const coverImageURL = await uploadToRemote(
      coverImageBuffer,
      coverImageRemoteDir,
      coverImage.fileType,
    ).then((url) => generateThumbnailURL(url));

    const url = await uploadToRemote(postBuffer, remoteDir, post.fileType);

    const id = await createPost({
      postData: {
        slug,
        title,
        subtitle,
        coverImageURL,
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
