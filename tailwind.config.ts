import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(button|dropdown|input|link|navbar|scroll-shadow|ripple|spinner|menu|divider|popover).js',
  ],
  theme: {
    extend: {
      translate: {
        double: '200%',
      },
    },
  },
  plugins: [require('daisyui'), nextui()],

  daisyui: {
    // styled: false,
    // themes: ["light", "dark"],
  },

  future: {
    // hoverOnlyWhenSupported: true,
  },
};

export default config;
