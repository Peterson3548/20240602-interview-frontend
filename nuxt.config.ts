// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    'nuxt-primevue',
  ],
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css',
    '/node_modules/primeflex/primeflex.css',
  ],
  runtimeConfig: {
    public: {
      backendBaseUrl: process.env.BACKEND_BASE_URL || '/api',
    },
  },
})
