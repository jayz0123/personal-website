const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.howiejayz.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
    ],
  },
  // experimental: {
  //   // reactCompiler: true,
  //   turbo: {
  //     resolveExtensions: [
  //       '.mdx',
  //       '.tsx',
  //       '.ts',
  //       '.jsx',
  //       '.js',
  //       '.mjs',
  //       '.json',
  //     ],
  //   },
  // },
};

module.exports = withMDX(nextConfig);
