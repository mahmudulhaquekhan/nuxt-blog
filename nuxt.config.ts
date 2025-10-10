// https://nuxt.com/docs/api/configuration/nuxt-config\
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    apiUrl: process.env.API_URL as string,
  },

  vue: {
    compilerOptions: {
      comments: true
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    'nuxt-auth-utils',
    '@nuxt/ui'
  ],
})