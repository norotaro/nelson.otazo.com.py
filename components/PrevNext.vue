<!-- ./components/PrevNext.vue -->

<script setup>
// import icons
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
// define prev and next props
defineProps(["prev", "next"]);
</script>

<template>
  <ul class="prev-next-cont">
    <li class="link-item prev">
      <NuxtLink v-if="prev" :to="prev._path">
        <ArrowLeftIcon class="h-6 w-6" />
        <span> {{ prev.title }} </span>
      </NuxtLink>
    </li>
    <li class="link-item next">
      <NuxtLink v-if="next" :to="next._path">
        <span> {{ next.title }} </span>
        <ArrowRightIcon class="h-6 w-6" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-4 border border-slate-200 rounded-lg;
}

.link-item a {
  @apply flex gap-2;
}
</style>