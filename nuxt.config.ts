// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.seline.com/seline.js',
          'data-token': 'debef75406a5780',
          async: true
        }
      ]
    }
  }
});
