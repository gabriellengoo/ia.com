
import tailwindcss from "@tailwindcss/vite"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
   
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    '@nuxtjs/sanity',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxt/eslint'
  ],

  googleFonts: {
    families: {
      Tahoma: true,
    },
    display: 'swap',
  },

  sanity: {
    projectId: 'bxv8ug21',
    dataset: 'production',
    useCdn: true
  }
})