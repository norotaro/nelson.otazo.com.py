// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
  ],
  sourcemap: false,
  devServerHandlers: [],
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: "github-dark",
      preload: [
        'php',
      ]
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  runtimeConfig: {
    public: {
      gtagId: ''
    }
  },
  site: {
    url: 'https://nelson.otazo.com.py',
  },
});
