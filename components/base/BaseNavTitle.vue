<script setup>
const props = defineProps({
    title: { type: String, default: 'Nelson Otazo' }
})
</script>
<template>
    <a href="/" :aria-label="title" :title="title" class="inline-flex items-center">
        <svg class="w-8 text-cyan-400" viewBox="0 0 24 24" stroke-linejoin="round" stroke-width="2"
            stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" fill="none">
            <rect x="3" y="4" width="7" height="19" />
            <rect x="14" y="1" width="7" height="19" />
        </svg>
        <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            {{ title }}
        </span>
    </a>
</template>