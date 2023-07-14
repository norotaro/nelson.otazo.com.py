// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-simple-robots",
    // 'nuxt-simple-sitemap',
  ],
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

  // Google Fonts module configuration: https://google-fonts.nuxtjs.org
  googleFonts: {
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap'
  },
  runtimeConfig: {
    public: {
      gtagId: '',
    }
  },
  site: {
    url: 'https://nelson.otazo.com.py',
  },
});
