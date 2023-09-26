import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_BASE_PUBLIC_PATH,
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'arcoblue-5': '#ff0000',
            'arcoblue-6': '#ff0000',
          },
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      eslint({ cache: false }),
      svgLoader(),
      vue(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
