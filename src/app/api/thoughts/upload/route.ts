import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import {
  THOUGHTS_REMOTE_PREFIX,
  generateRemoteDirForPrefix,
  uploadToRemote,
} from '@/services';
import matter from 'gray-matter';

import {
  ThoughtsPostMetadata,
  ThoughtsPostUploadForm,
} from '@/lib/definitions';

import { converBase64ToText, convertBase64ToBuffer } from '@/utils/fileHelpers';
import { generateblurDataURL } from '@/utils/imageHelpers';

import { createPost } from '@/services/db/thoughts';

export async function POST(request: NextRequest) {
  try {
    const { coverImages, posts, published } =
      (await request.json()) as ThoughtsPostUploadForm;

    if (coverImages.length !== posts.length) {
      return NextResponse.error();
    }

    for (const [index, value] of posts.entries()) {
      const markdownWithFrontMatter = converBase64ToText(value.content);
      const { data, content } = matter(markdownWithFrontMatter);

      const {
        title,
        abstract,
        date: dateString,
        categories: rawCategories,
      } = data as ThoughtsPostMetadata;

      // create post slug based on its title
      const slug = data.title.replace(/ /g, '-').toLowerCase().trim();

      // parse date
      const date = new Date(dateString);

      // create post categories array
      const categories = rawCategories.split(', ').map((category) => {
        return {
          slug: category.replace(/ /g, '-').toLowerCase().trim(),
          name: category.trim(),
        };
      });

      // get cover image buffer, remote dir, and file type
      const coverImageBuffer = convertBase64ToBuffer(
        coverImages[index].content,
      );
      const coverImageRemoteDir = generateRemoteDirForPrefix(
        THOUGHTS_REMOTE_PREFIX,
        'posts',
        slug,
        'cover-image',
      );
      const coverImageFileType = coverImages[index].fileType;

      // get post buffer, remote dir, and file type
      const postBuffer = convertBase64ToBuffer(content);
      const postRemoteDir = generateRemoteDirForPrefix(
        THOUGHTS_REMOTE_PREFIX,
        'posts',
        slug,
        'markdown',
      );
      const postFileType = value.fileType;

      // upload cover image and post to remote
      const [url, coverImageURL] = await Promise.all([
        uploadToRemote(postBuffer, postRemoteDir, postFileType),
        uploadToRemote(
          coverImageBuffer,
          coverImageRemoteDir,
          coverImageFileType,
        ),
      ]);

      // generate blur data url for cover images
      const coverImageBlurDataURL = await generateblurDataURL(coverImageURL);

      // create post in db
      const id = await createPost({
        postData: {
          slug,
          url,
          coverImageURL,
          coverImageBlurDataURL,
          title,
          abstract,
          date,
          published,
        },
        categories,
      });
    }

    revalidateTag('posts');

    return NextResponse.json(
      { body: `${posts.length} Posts Uploaded` },
      { status: 200 },
    );
  } catch {
    return NextResponse.error();
  }
}
