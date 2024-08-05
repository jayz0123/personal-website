'use server';

import { revalidateTag } from 'next/cache';

export const revalidateDatabase = async (tag: string) => revalidateTag(tag);
