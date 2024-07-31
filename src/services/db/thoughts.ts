import { unstable_cache } from 'next/cache';

import prisma, { Prisma } from '@/lib/prisma';

export async function createPost({
  postData,
  categories,
}: {
  postData: Prisma.PostCreateWithoutCategoriesInput;
  categories: { name: string }[];
}) {
  try {
    const { id } = await prisma.post.create({
      data: {
        ...postData,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { id: category.name },
            create: { id: category.name },
          })),
        },
      },
    });

    return id;
  } catch (e) {
    console.log(e);
  }
}

const findPosts = async () => {
  console.log('querying findPosts');
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
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
