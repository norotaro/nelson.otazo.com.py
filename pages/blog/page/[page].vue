<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const { params, query: { tags }, } = useRoute();

definePageMeta({
    key: (route) => route.fullPath,
});

const filter = ref(tags?.toString().split(","));

const query: QueryBuilderParams = {
    only: ['title', 'description', 'category', 'date', 'tags', '_path', 'img'],

    sort: [{ date: -1 }],
    limit: 5,
    skip: (Number(params.page) - 1) * 5,
    // where: {
    //   tags: {
    //     $contains: filter,
    //   },
    // },
    // $sensitivity: 'base',
};

const total: number = (await queryContent('/blog/post').find()).length

// set meta for page
useHead({
    title: "Mi blog en español",
    htmlAttrs: {lang: 'es'},
    meta: [{ name: "description", content: "Aquí encontrarás artículos y tutoriales completamente en español sobre programación, desarrollo web y herramientas relacionadas." }],
});

const formatDate = function (date: string): string {
    const options: Object = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-PY', options)
}
</script>

<template>
    <BlogHeader></BlogHeader>
    <section>
        <!-- <Tags /> -->

        <!-- Render list of all articles in ./content/blog using `path` -->
        <!-- Provide only defined fieldsin the `:query` prop -->
        <ContentList path="/blog/post" :query="query">
            <!-- Default list slot -->
            <template v-slot="{ list }">
                <div class="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-wscreen-xl md:px-24 lg:px-8 lg:py-20">
                    <div v-for="article in list" :key="article._path"
                        class="border-t border-b py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-10">
                        <div class="grid gap-10 lg:grid-cols-2">
                            <div class="lg:pr-10">
                                <a href="/"
                                    class="font-bold transition-colors duration-200 text-yellow-accent-700 hover:text-yellow-800"
                                    aria-label="Category">
                                    {{ article.category }}
                                </a>
                                <p class=" mb-2 mt-5 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                    {{ formatDate(article.date) }}
                                </p>
                                <div class="mb-4">
                                    <NuxtLink :to="article._path" aria-label="Article"
                                        class="inline-block max-w-lg font-sans text-3xl font-extrabold leading-none tracking-tight text-black transition-colors duration-200 hover:text-cyan-accent-700 sm:text-4xl">
                                        {{ article.title }}
                                    </NuxtLink>
                                </div>
                                <p class="mb-6 text-gray-900">
                                    {{ article.description }}
                                </p>
                            </div>
                            <div>
                                <NuxtLink :to="article._path" aria-label="Article">
                                    <img class="object-cover w-full h-56 rounded shadow-lg sm:h-80"
                                        :src="`/img/blog/${article.img}`" :alt="article.title">
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <div v-if="total" class="constainer mx-auto my-5 max-w-5xl">
                        <BlogPagination v-if="total > 5" :total="total" />
                    </div>
                </div>
            </template>

            <!-- Not found slot to display message when no content us is found -->
            <template #not-found>
                <p>No articles found.</p>
            </template>
        </ContentList>
    </section>
</template>