<script setup>
import getSiteMeta, { title } from './utils/getSiteMeta';

const meta = getSiteMeta();

useHead({
  title,
  htmlAttrs: {lang: 'en'},
  meta: [
    ...meta,
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'og:site_name', content: title },
    { property: 'og:image:width', content: '740' },
    { property: 'og:image:height', content: '300' },
    { name: 'twitter:site', content: '@norotaro_dev' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;500;600;700;800;900&display=swap'
      },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: url
      }
    ]
})
</script>
<template>
  <main>
    <BaseNav></BaseNav>
    <NuxtPage />
    <BaseFooter></BaseFooter>
  </main>
</template>
