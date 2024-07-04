import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN!,
  },
});

export async function listImages(dir: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Prefix: dir,
  });
  const response = await s3.send(command);
  console.log(response);
  return response.Contents?.map((content) => content.Key);
}
