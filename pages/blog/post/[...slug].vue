<script setup>
const { path } = useRoute();
const { data } = await useAsyncData(`content-${path}`, async () => {

  // fetch document where the document path matches with the cuurent route
  let article = queryContent().where({ _path: path }).findOne();

  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent()
    .only(["_path", "title", "description", "date"])
    .sort({ date: -1 })
    .findSurround(path);

  return {
    article: await article,
    surround: await surround,
  };
});

// destrucure `prev` and `next` value from data
const [prev, next] = data.value.surround;

// set the meta
useHead({
  title: data.value.article.title,
  meta: [
    { name: "description", content: data.value.article.description },
    {
      hid: "og:image",
      property: "og:image",
      content: `https://nelson.otazo.com.py/img/blog/${data.value.article.img}`,
    },
  ],
});

const formatDate = function (date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('es-PY', options)
}
</script>

<template>
  <div class="container w-full md:max-w-3xl mx-auto pt-10">
  <article class="w-full px-4 text-xl text-gray-800" style="font-family: Georgia, serif">
    <header class="font-sans">
      <p class="text-base md:text-sm text-cyan-400 font-bold">
        <NuxtLink
          to="/blog/page/1"
          class="text-base md:text-sm text-cyan-400 font-bold no-underline hover:underline"
        >
          &lt; VOLVER A LA LISTA
        </NuxtLink>
      </p>
      <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
        {{  data.article.title }}
      </h1>
      <p class="text-sm md:text-base font-normal text-gray-600">
        Publicado el {{ formatDate(data.article.date) }}
      </p>
      <!-- <header v-if="data.article" class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
        <div class="img-cont h-72 mb-12">
          <img :src="`/img/blog/${data.article.img}`" :alt="data.article.title" class=" rounded-2xl" />
        </div>
        <h1 class="heading">{{ data.article.title }}</h1>
        <p class="supporting">{{ data.article.description }}</p>
        <ul class="article-tags">
          <li class="tag" v-for="(tag, n) in data.article.tags" :key="n">{{ tag }}</li>
        </ul>
      </header> -->
    </header>
    
    <img class="my-8" :src="`/img/blog/${data.article.img}`" alt="Imagen representativa del artículo" />

    <nav>
      <!-- Toc Component -->
      <Toc :links="data.article.body.toc.links" />
    </nav>

    <section class="article-section">
      <article class="article prose lg:prose-xl prose-a:text-cyan-400">
        <!-- render document coming from query -->
        <ContentRenderer :value="data.article">
        </ContentRenderer>
      </article>
    </section>

    <!-- PrevNext Component -->
    <PrevNext :prev="prev" :next="next" />
  </article>
  </div>
</template>

<style scoped>
.article h2 {
  @apply text-3xl pt-3;
}
.article h3 {
  @apply text-2xl;
}
.article p {
  @apply py-3;
}

.article h2 .icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}

.nuxt-content-highlight {
  @apply relative text-base;
}
.nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-600 font-light z-10 mr-2 mt-1 text-sm;
}
</style>
