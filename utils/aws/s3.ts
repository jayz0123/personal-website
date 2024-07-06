import { cache } from 'react';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN!,
  },
});

export const listFilePaths = cache(async (dir: string) => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Prefix: dir,
  });
  const response = await s3.send(command);

  if (!response.Contents) {
    return [];
  }

  console.log(response);
  return response.Contents.reduce((acc: string[], content) => {
    if (content.Size !== 0) {
      acc.push(content.Key!);
    }
    return acc;
  }, []);
});

export const listFolders = cache(async (dir: string) => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Prefix: dir,
    Delimiter: '/',
  });
  const response = await s3.send(command);

  if (!response.CommonPrefixes) {
    return [];
  }

  console.log(response);
  return response.CommonPrefixes.map((item) =>
    item.Prefix!.replace(dir, '').replace('/', ''),
  );
});
