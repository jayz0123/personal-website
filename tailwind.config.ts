import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(breadcrumbs|button|card|checkbox|dropdown|image|input|link|modal|navbar|pagination|progress|scroll-shadow|skeleton|tabs|ripple|spinner|menu|divider|popover).js',
  ],
  theme: {
    extend: {
      content: {
        link: 'url("/link.svg")',
      },
      translate: {
        double: '200%',
      },
      screens: {
        betterhover: { raw: '(hover: hover)' },
      },
    },
  },
  daisyui: {
    base: false,
    // styled: false,
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            background: '#F7F7F7',
            foreground: '#4B5563',
          },
        },
        dark: {
          colors: {
            background: '#242629',
            foreground: '#CBD2D9',
          },
        },
      },
    }),
  ],
};

export default config;
