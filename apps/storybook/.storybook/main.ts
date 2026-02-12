import type { StorybookConfig } from '@storybook/react-vite';

const fontLink =
  '<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;700&display=swap" rel="stylesheet" />';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../../../assets'],
  previewHead: (head) => `${head}${fontLink}`,
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
};

export default config;
