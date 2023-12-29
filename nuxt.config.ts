import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@unocss/nuxt'],
  ssr: false,
  vite: {
    plugins: [
      nodePolyfills({
        include: ['crypto', 'http'],
        globals: { Buffer: true, global: true, process: true },
      }),
    ],
    optimizeDeps: {
      exclude: ['@ethersproject/hash', 'wrtc', 'http'],
      include: [
        '@web3-onboard/core',
        'bn.js',
        'js-sha3',
        'hash.js',
        'aes-js',
        'scrypt-js',
        'bech32',
      ],
    },
    build: {
      rollupOptions: {
        external: ['@web3-onboard/*'],
      },
    },
  },
  // build: { transpile: ['@ethersproject'] },
});
