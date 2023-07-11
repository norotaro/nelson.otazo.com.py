<script setup>
const props = defineProps({
    "total": {
        type: Number,
        default: 0
    },
    "perPage": {
        "type": Number,
        default: 5
    }
})

const { params } = useRoute();

const buttonStyles = () => 'px-4 py-1 text-sm bg-white flex justify-center items-center sm:uppercase hover:bg-yellow-accent-700 hover:text-white transform duration-500 ease-in-out'

const disabledStyle = () => 'px-4 py-1 text-sm bg-white flex justify-center items-center sm:uppercase text-gray-300'

const totalPages = () => Math.ceil(props.total / props.perPage)

const currentPage = () => parseInt(params.page) || 1

const prevPage = () => currentPage() > 1 ? currentPage() - 1 : 1

const nextPage = () => currentPage() < totalPages() ? currentPage() + 1 : totalPages()
</script>

<template>
    <div class="flex justify-between">
      <div class="flex">
        <div v-if="currentPage() === 1" :class="disabledStyle()">
          <SvgDoubleBack />
          <span class="hidden sm:inline">Primero</span>
        </div>
  
        <nuxt-link
          v-else
          :to="{ name: 'blog-page-page', params: { page: 1 } }"
          :class="buttonStyles()"
        >
          <SvgDoubleBack />
          <span class="hidden sm:inline">Primero</span>
        </nuxt-link>
  
        <div v-if="currentPage() === 1" :class="disabledStyle()">
          <SvgSingleBack />
          <span class="hidden sm:inline">Anterior</span>
        </div>
  
        <nuxt-link
          v-else
          :to="{ name: 'blog-page-page', params: { page: prevPage } }"
          :class="buttonStyles()"
        >
          <SvgSingleBack />
          <span class="hidden sm:inline">Anterior</span>
        </nuxt-link>
      </div>
  
      <div class="flex">
        <div v-if="currentPage() === totalPages()" :class="disabledStyle()">
          <span class="hidden sm:inline">Siguiente</span>
          <SvgSingleFwd />
        </div>
  
        <nuxt-link
          v-else
          :to="{ name: 'blog-page-page', params: { page: nextPage() } }"
          :class="buttonStyles()"
        >
          <span class="hidden sm:inline">Siguiente</span>
          <SvgSingleFwd />
        </nuxt-link>
  
        <div v-if="currentPage() === totalPages()" :class="disabledStyle()">
          <span class="hidden sm:inline">Último</span>
          <SvgDoubleFwd />
        </div>
  
        <nuxt-link
          v-else
          :to="{ name: 'blog-page-page', params: { page: totalPages() } }"
          :class="buttonStyles()"
        >
          <span class="hidden sm:inline">Último</span>
          <SvgDoubleFwd />
        </nuxt-link>
      </div>
    </div>
  </template>