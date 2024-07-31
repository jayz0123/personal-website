import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma.$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production')
  globalThis.prismaGlobal = prisma.$extends(withAccelerate());
export { Prisma };
