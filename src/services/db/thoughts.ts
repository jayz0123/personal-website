import { unstable_cache } from 'next/cache';

import prisma, { Prisma } from '@/lib/prisma';

export async function createPost({
  post,
  categories,
}: {
  post: Prisma.PostCreateWithoutCategoriesInput;
  categories: string[];
}) {
  try {
    await prisma.post.create({
      data: {
        ...post,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { id: category },
            create: { id: category },
          })),
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
}

const findPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: false,
      },
      include: {
        categories: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts;
  } catch (e) {
    console.log(e);
  }
};

export const findPostsCached = unstable_cache(findPosts, ['posts']);
